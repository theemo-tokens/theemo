import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';

import { isBrowserFeature, Principal } from '@theemo/theme';

import type { TheemoService } from '@theemo/ember';
import type { Feature } from '@theemo/theme';

const eq = (a: unknown, b: unknown) => {
  return a === b;
};

const and = (a: boolean, b: boolean) => {
  return a && b;
};

export default class ThemeManager extends Component {
  @service declare theemo: TheemoService;

  canUnset = (feature: Feature) => {
    return isBrowserFeature(feature) && feature.principal === Principal.User;
  };

  <template>
    <h1>Themes</h1>

    <div id="themes">
      {{#each this.theemo.themes as |theme|}}
        <button type="button" {{on "click" (fn this.theemo.switchTheme theme.name)}}>
          {{theme.name}}
        </button>
      {{/each}}
    </div>

    <h2>Features</h2>

    <div id="features">
      {{#each this.theemo.features as |feature|}}
        <fieldset>
          <legend>{{feature.name}}</legend>

          <p>Principal: {{feature.principal}}</p>

          <div id="options">
            {{#each feature.options as |option|}}
              <label>
                <input
                  type="radio"
                  name="{{feature.name}}"
                  value="{{option}}"
                  checked={{eq feature.value option}}
                  {{on "change" (fn this.theemo.setFeature feature.name option)}}
                />
                <span>
                  {{option}}

                  {{#if (and (isBrowserFeature feature) (eq option feature.browserValue))}}
                    (System)
                  {{/if}}
                </span>
              </label>
            {{/each}}
          </div>

          {{#if (this.canUnset feature)}}
            <button type="button" {{on "click" (fn this.theemo.unsetFeature feature.name)}}>
              Unset Mode
            </button>
          {{/if}}
        </fieldset>

      {{/each}}
    </div>
  </template>
}
