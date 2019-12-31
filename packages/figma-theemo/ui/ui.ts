import '../vendor/figma-plugin-ds.min.css'
// import '../vendor/figma-plugin-ds.min'
import './ui.css'

interface StyleIdentifier {
  id: string;
  name: string;
}

interface Reference {
  local: StyleIdentifier;
  from: StyleIdentifier;
  to: StyleIdentifier;
}

const sections: {
  fill?: StyleSection;
  stroke?: StyleSection;
  effect?: StyleSection;
} = {}

onmessage = (event) => {
  const message = event.data.pluginMessage;

  if (message.node) {
    // handle  section
    showSection('selection');

    sections.fill = new StyleSection('fill', message.styles.fill, message.paintStyles);
    sections.stroke = new StyleSection('stroke', message.styles.stroke, message.paintStyles);
    sections.effect = new StyleSection('effect', message.styles.effect, message.effectStyles);
  }

  if (message.event) {
    switch (message.event) {
      case 'origin-linked':
      case 'origin-migrated':
      case 'reference-created':
      case 'reference-unlinked':
        sections[message.style].update(message.data);
        break;
    }
  }
}

function showSection(name: string) {
  for (const elem of document.getElementsByClassName('section')) {
    (elem as HTMLElement).style.display = 'none';
  }

  document.getElementById(name).style.display = "block";
}

showSection('update');

class StyleSection {
  private section: string;
  private data: Reference;
  private suggestions: BaseStyle[];
  private root: HTMLElement;

  constructor(section: string, data: Reference, suggestions: BaseStyle[]) {
    this.section = section;
    this.data = data;
    this.suggestions = suggestions;

    this.setup();
    this.bind();
    this.render();

    // post setup, call the `selectMenu` once for all `<select>`
    // see second comment here: 
    // https://github.com/thomas-lowry/figma-plugin-ds/issues/17
    // // @ts-ignore
    // selectMenu.init({
    //   selector: `origin-suggestions`
    // });
  }

  private setup() {
    const template = document.getElementById('style-section') as HTMLTemplateElement;
    const fragment = document.importNode(template.content, true);
    this.root = fragment.firstElementChild as HTMLElement;
    document.getElementById('selection').appendChild(fragment);

    // set title
    this.elem('title').innerHTML = this.section[0].toUpperCase() + this.section.slice(1);

    // set class on origin-select
    const originName = this.elem('origin-name');
    originName.classList.add(`${this.section}-origin-suggestions`);
  }

  private bind() {
    // link style
    this.elem('origin-create').onclick = (e) => {
      const name = (this.elem('origin-name') as HTMLInputElement).value;

      if (name) {
        parent.postMessage({ pluginMessage: { command: 'link-origin', name, style: this.section } }, '*');
      }
    };

    // create reference
    this.elem('ref-form').onsubmit = (e) => {
      e.preventDefault();
      const name = (this.elem('ref-name') as HTMLInputElement).value;

      if (name) {
        const origin = this.data.local;
        parent.postMessage({ pluginMessage: { command: 'create-reference', from: origin.id, name, style: this.section } }, '*');
      }
    };

    // migrate keep
    this.elem('migrate-keep').onclick = (e) => {
      parent.postMessage({ pluginMessage: { command: 'migrate-origin', style: this.section, target: this.data.from.id } }, '*');
    };

    // migrate switch
    this.elem('migrate-switch').onclick = (e) => {
      parent.postMessage({ pluginMessage: { command: 'migrate-origin', style: this.section, target: this.data.local.id } }, '*');
    };

    // unlink
    this.elem('ref-unlink').onclick = (e) => {
      parent.postMessage({ pluginMessage: { command: 'unlink-reference', style: this.section } }, '*');
    };
  }

  private elem(selector: string): HTMLElement {
    return this.root.querySelector(`[data-elem="${selector}"]`);
  }

  private render() {
    this.renderOrigin();
    this.renderReference();
  }

  private getOrigin() {
    return this.data.to ? this.data.from : undefined;
  }

  private needsMigration() {
    return this.data.to ? this.data.to.id !== this.data.local.id : false;
  }

  private renderOrigin() {
    // hide all fields at first
    for (const field of ['migrate', 'exists', 'none']) {
      this.elem(`origin-${field}`).style.display = 'none';
    }

    const origin = this.getOrigin();

    // migrate
    if (this.needsMigration()) {
      this.renderOriginMigration();
    }

    // exists
    else if (origin || this.data.local) {
      this.renderOriginExisting();
    }

    // none
    else {
      this.renderOriginNone();
    }
  }

  private renderOriginMigration() {
    this.elem('origin-migrate').style.display = 'flex';

    this.elem('migrate-active').innerHTML = this.data.from.name;
    this.elem('migrate-new').innerHTML = this.data.local.name;
  }

  private renderOriginExisting() {
    const field = this.elem('origin-exists');
    field.style.display = 'flex';

    const style = this.getOrigin() || this.data.local;

    this.elem('origin-exists-name').innerHTML = style.name;
  }

  private renderOriginNone() {
    this.elem('origin-none').style.display = 'flex';

    const originName = this.elem('origin-name');
    this.renderOptions(originName);

    // keep this for the post-setup routine
    // if (this.suggestions.length > 0) {
    //   originName.classList.add('origin-suggestions');
    // }

    // add the `selectMenu` one-by-one for only this section
    // bug, see: https://github.com/thomas-lowry/figma-plugin-ds/issues/17
    // if (this.suggestions.length > 0) {
    //   // @ts-ignore
    //   selectMenu.init({
    //     selector: `${this.section}-origin-suggestions`
    //   });
    // }
  }

  private renderReference() {
    // hide all fields at first
    for (const field of ['exists', 'none']) {
      this.elem(`ref-${field}`).style.display = 'none';
    }

    const origin = this.getOrigin();
    if (!origin && !this.data.local) {
      return;
    }

    // none
    if (!this.data.to) {
      this.elem('ref-none').style.display = 'flex';
      this.renderOptions(this.elem('ref-suggestions'));
    }

    // exists
    else {
      this.elem('ref-exists').style.display = 'flex';

      const ref = this.data.to;
      this.elem('ref-exists-name').innerHTML = ref.name;
    }
  }

  private renderOptions(element: HTMLElement) {
    for (const style of this.suggestions) {
      const opt = document.createElement('option');
      opt.appendChild(document.createTextNode(style.name));
      element.appendChild(opt);
    }
  }

  update(data: Reference) {
    this.data = data;
    this.render();
  }

}