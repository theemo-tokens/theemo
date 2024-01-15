/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getClassesFromAttrs(attrs) {
  return (attrs ?? '')
    .split(' ')
    .filter((attr) => attr.startsWith('.'))
    .map((attr) => attr.substring(1))
    .join(' ');
}

/**
 *
 * @param {Object} md - Markdown It object
 *
 * @return {function} - Tokenizer Function
 */
function figureRenderer(md) {
  return function figureRender(tokens, idx) {
    const token = tokens[idx];

    const videoExtensions = ['mp4', 'mkv'];
    const video = videoExtensions.some((ext) => token.fig.endsWith(ext));

    const id = token.figid
      ? `id="figure-${md.utils.escapeHtml(token.figid)}"`
      : '';
    const src = token.fig ? `src="${md.utils.escapeHtml(token.fig)}"` : '';
    const alt = token.figalt
      ? `alt="${md.utils.escapeHtml(token.figalt)}"`
      : '';
    const figcaption = token.figcaption
      ? `<figcaption>${md.renderInline(token.figcaption)}</figcaption>`
      : '';
    let classes = getClassesFromAttrs(token.attrs);
    classes = classes ? `class="${classes}"` : '';

    const media = video
      ? `<video ${src} ${alt} controls/>`
      : `<img ${src} ${alt}/>`;
    const figure = `<figure ${id} ${classes}>${media}${figcaption}</figure>`;

    return figure;
  };
}

/**
 *
 * @param {object} src - Source being validated
 * @param {number} pos - position to start from
 *
 * @return {boolean} Is the source valid?
 */
function validateStart(src) {
  return src.startsWith('!#');
}

// [\s]*(\{.+\})*

const FIGURE_REGEX =
  /!#([\w-]+)*\[(.+)]\([\s]*(.*?)[\s]*(\[.*?\])??[)](\{(.+)\})*/im;

/**
 *
 * @param {*} md
 *
 * @return {function} - A function that takes state and returns tokens for
 */
function figureRuler(md) {
  return function figureTokenize(state, silent) {
    const oldPos = state.pos;

    const valid = validateStart(state.src, oldPos);

    if (!valid) return false;

    const match = FIGURE_REGEX.exec(
      state.src.slice(state.pos, state.src.length)
    );

    if (!match) return false;

    const figid = match[1] || false;
    const figcaption = match[2] || false;
    const fig = match[3] || false;
    const attrs = match[5] || false;
    const figalt = match[4]
      ? match[4].substring(1, match[4].length - 1)
      : false;

    const labelStart = state.pos + 2 + (figid.length || 0);
    const labelEnd =
      labelStart + (figcaption.length || 0) + (attrs.length || 0);

    if (labelEnd < 0) return false;

    const theState = state;

    if (!silent) {
      theState.pos = labelStart;
      theState.caption = theState.src.slice(labelStart, labelEnd);
      const newState = new theState.md.block.State(
        figcaption,
        theState.md,
        theState.env,
        []
      );
      newState.md.block.tokenize(newState);

      const token = theState.push('figure', '');
      token.figid = figid;
      token.figcaption = figcaption;
      token.fig = fig;
      token.figalt = figalt;
      token.block = true;
      token.attrs = match[6];
    }

    // theState.pos += theState.src.indexOf(')', theState.pos);
    theState.pos += state.src.slice(state.pos, state.src.length).length;
    return true;
  };
}

export function figurePlugin(md) {
  md.renderer.rules.figure = figureRenderer(md);
  md.inline.ruler.before('emphasis', 'figure', figureRuler(md));
};
