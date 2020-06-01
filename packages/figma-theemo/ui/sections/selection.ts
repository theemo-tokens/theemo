import Section from './section';
import Messenger from '../messenger';
// import { selectMenu } from 'figma-plugin-ds';

export default class SelectionSection extends Section {
  name = 'selection';

  private sections: {
    fill?: StyleSection;
    stroke?: StyleSection;
    effect?: StyleSection;
    text?: StyleSection;
  } = {};

  setup() {
    this.messenger.addListener('selection-changed', (data) => {
      const howTo = document.getElementById('selection-how-to');
      const content = document.getElementById('selection-content');
      howTo.style.display = 'none';
      content.style.display = 'none';
      this.sections = {};

      if (data === null) {
        howTo.style.display = 'inline';
      } else {
        content.style.display = 'block';
        document.getElementById('selection-tab-items').innerHTML = '';
        document.getElementById('selection-tab-content').innerHTML = '';

        for (const style of Object.keys(data.styles)) {
          this.sections[style] = new StyleSection({
            messenger: this.messenger,
            node: data.node,
            section: style,
            collection: data.collection[style],
            data: data.styles[style],
            suggestions: data.repo[data.collection[style]]
          });
        }

        // This is buggy, issue to come
        // Repro:
        // - uncomment import at the header of this file
        // - add  class="select-menu" to  `<select>` in  `ui.html`
        // - uncomment this line
        //
        // selectMenu.init();
      }
    });

    const update = this.update.bind(this);

    this.messenger.addListener('origin-linked', update);
    this.messenger.addListener('origin-unlinked', update);
    this.messenger.addListener('origin-migrated', update);
    this.messenger.addListener('reference-created', update);
    this.messenger.addListener('reference-unlinked', update);
    this.messenger.addListener('transforms-saved', update);
  }

  private update(message) {
    if (this.sections[message.style]) {
      this.sections[message.style].update(message.data);
    }
  }
}

interface StyleIdentifier {
  id: string;
  name: string;
}

interface Reference {
  local: StyleIdentifier;
  from: StyleIdentifier;
  to: StyleIdentifier;
  transforms?: object;
}

class StyleSection {
  private messenger: Messenger;
  private node: { id: string };
  private section: string;
  private collection: string;
  private data: Reference;
  private suggestions: BaseStyle[];
  private root: HTMLElement;
  private tab: HTMLElement;

  constructor(options: {
    messenger: Messenger;
    node: { id: string };
    section: string;
    collection: string;
    data: Reference;
    suggestions: BaseStyle[];
  }) {
    Object.assign(this, options);

    this.setup();
    this.bind();
    this.render();
  }

  private send(command: string, data: any = {}) {
    this.messenger.send(command, Object.assign({}, { node: this.node, style: this.section }, data))
  }

  private setup() {
    const template = document.getElementById('style-section') as HTMLTemplateElement;
    const fragment = document.importNode(template.content, true);
    this.root = fragment.firstElementChild as HTMLElement;
    document.getElementById('selection-tab-content').appendChild(this.root);

    // add tab
    this.tab = document.createElement('li');
    this.tab.innerHTML = this.section[0].toUpperCase() + this.section.slice(1);
    document.getElementById('selection-tab-items').appendChild(this.tab);

    // set class on origin-select
    const originName = this.elem('origin-name');
    originName.classList.add(`${this.section}-origin-suggestions`);

    if (document.getElementById('selection-tab-items').children.length === 1) {
      this.activateSection();
    }

    this.tab.addEventListener('click', () => {
      this.activateSection();
    });
  }

  private activateSection() {
    // set tab active
    for (const tab of this.tab.parentElement.children) { 
      tab.classList.remove('active');
    }
    this.tab.classList.add('active');

    // set content active
    for (const content of this.root.parentElement.children) { 
      content.classList.remove('active');
    }
    this.root.classList.add('active');
  }

  private bind() {
    // link style
    this.elem('origin-name').onchange = (e) => {
      const name = (this.elem('origin-name') as HTMLInputElement).value;

      if (name) {
        this.send('link-origin', { name });
      } else {
        this.send('unlink-origin');
      }
    };

    // origin unlink
    this.elem('origin-unlink').onclick = (e) => {
      this.send('unlink-origin');
    };

    // migrate keep
    this.elem('migrate-keep').onclick = (e) => {
      this.send('migrate-origin', { target: this.data.from.id });
    };

    // migrate switch
    this.elem('migrate-switch').onclick = (e) => {
      this.send('migrate-origin', { target: this.data.local.id });
    };

    // create reference
    this.elem('ref-form').onsubmit = (e) => {
      e.preventDefault();
      const name = (this.elem('ref-name') as HTMLInputElement).value;

      if (name) {
        const origin = this.data.local;
        this.send('create-reference', { from: origin.id, name });
      }
    };

    // ref unlink
    this.elem('ref-unlink').onclick = (e) => {
      this.send('unlink-reference');
      (this.elem('ref-name') as HTMLInputElement).value = this.data.to.name;
    };

    // transforms
    const updateTransforms = (prop: string, value: string) => { 
      const number = parseInt(value, 10);

      // udpate
      if (number) {
        if (!this.data.transforms) {
          this.data.transforms = {};
        }

        this.data.transforms[prop] = number;
      }

      // delete
      else if (this.data.transforms && this.data.transforms[prop]) {
        delete this.data.transforms[prop];
      }

      this.send('save-transforms', { transforms: this.data.transforms });
    };
    for (const prop of ['hue', 'saturation', 'lightness', 'opacity']) { 
      this.elem(prop).onblur = (e) => { updateTransforms(prop, (e.target as HTMLInputElement).value) };
      this.elem(prop).onkeydown = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        const number = parseInt(target.value, 10);
        if (e.code === 'ArrowUp') {
          target.value = `${number + 1}`;
          e.preventDefault();
        }
        if (e.code === 'ArrowDown') {
          target.value = `${number - 1}`;
          e.preventDefault();
        }
      };
    }
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
    for (const field of ['link', 'migrate']) {
      this.elem(`origin-${field}`).style.display = 'none';
    }

    // migrate
    if (this.needsMigration()) {
      this.renderOriginMigration();
    } else {
      this.renderOriginLink();
    }
  }

  private renderOriginMigration() {
    this.elem('origin-migrate').style.display = 'flex';

    this.elem('migrate-active').innerHTML = this.data.from.name;
    this.elem('migrate-new').innerHTML = this.data.local.name;
  }

  private renderOriginLink() {
    this.elem('origin-link').style.display = 'flex';

    const origin = this.getOrigin();
    const originName = this.elem('origin-name');
    this.renderOptions(originName, origin?.name || this.data.local?.name);
    this.elem('origin-unlink').style.display = (origin || this.data.local) && !this.data.to ? 'block' : 'none';
  }

  private renderReference() {
    // hide all fields at first
    for (const field of ['exists', 'none']) {
      this.elem(`ref-${field}`).style.display = 'none';
    }

    if (this.collection === 'paint') {
      this.elem('transforms').style.display = 'block';

      for (const prop of ['hue', 'saturation', 'lightness', 'opacity']) { 
        (this.elem(prop) as HTMLInputElement).value =
          this.data.transforms && this.data.transforms[prop] ? this.data.transforms[prop] : '';
      }
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

  private renderOptions(element: HTMLElement, selected?: string) {
    element.innerHTML = '';
    const isInOptions = this.suggestions.some(style => selected && style.name === selected);
    const options = this.suggestions.slice();
    if (!isInOptions) {
      options.unshift({
        name: '',
        id: '',
        remote: false,
        description: '',
        key: '',
        type: 'PAINT',
        remove() { },
        // @ts-ignore
        getPublishStatusAsync() { }
      });
    }

    for (const style of options) {
      const opt = document.createElement('option');
      opt.appendChild(document.createTextNode(style.name));
      opt.value = style.name;
      opt.selected = selected && style.name === selected;
      element.appendChild(opt);
    }
  }

  update(data: Reference) {
    this.data = data;
    this.render();
  }
}