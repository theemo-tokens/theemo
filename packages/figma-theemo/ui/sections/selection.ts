import Section from './section';
import Messenger from '../messenger';

export default class SelectionSection extends Section {
  name = 'selection';

  private sections: {
    fill?: StyleSection;
    stroke?: StyleSection;
    effect?: StyleSection;
  } = {};

  setup() {
    this.messenger.addListener('selection-changed', (data) => {
      document.getElementById('selection').innerHTML = '';

      if (data === null) {
        document.getElementById('selection').innerHTML = '<span class="how-to">Please select something to manage style references</span>';
        this.sections = {};
      } else {
        for (const style of Object.keys(data.styles)) {
          this.sections[style] = new StyleSection(this.messenger, data.node, style, data.styles[style], data.repo[data.collection[style]]);
        }
      }
    });

    const update = this.update.bind(this);

    this.messenger.addListener('origin-linked', update);
    this.messenger.addListener('origin-unlinked', update);
    this.messenger.addListener('origin-migrated', update);
    this.messenger.addListener('reference-created', update);
    this.messenger.addListener('reference-unlinked', update);
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
}

class StyleSection {
  private messenger: Messenger;
  private node: { id: string };
  private section: string;
  private data: Reference;
  private suggestions: BaseStyle[];
  private root: HTMLElement;

  constructor(messenger: Messenger, node: { id: string }, section: string, data: Reference, suggestions: BaseStyle[]) {
    this.messenger = messenger;
    this.node = node;
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

  private send(command: string, data: any = {}) {
    this.messenger.send(command, Object.assign({}, { node: this.node, style: this.section }, data))
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
    // for (const elem of ['origin-create', 'origin-update']) {
    this.elem('origin-name').onchange = (e) => {
      const name = (this.elem('origin-name') as HTMLInputElement).value;

      if (name) {
        this.send('link-origin', { name });
      } else {
        this.send('unlink-origin');
      }
    };
    // }

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

    // this.elem('origin-create').style.display = !this.data.to && !(origin || this.data.local) ? 'block' : 'none';
    // this.elem('origin-update').style.display = origin || this.data.local ? 'block' : 'none';
    this.elem('origin-unlink').style.display = (origin || this.data.local) && !this.data.to ? 'block' : 'none';

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

  private renderOptions(element: HTMLElement, selected?: string) {
    element.innerHTML = '';
    const isInOptions = this.suggestions.some(style => selected && style.name === selected);
    const options = this.suggestions.slice();
    if (!isInOptions) {
      options.unshift({ name: '', id: '', remote: false, description: '', key: '', type: 'PAINT', remove() { } });
    }

    for (const style of options) {
      const opt = document.createElement('option');
      opt.appendChild(document.createTextNode(style.name));
      opt.selected = selected && style.name === selected;
      element.appendChild(opt);
    }
  }

  update(data: Reference) {
    this.data = data;
    this.render();
  }
}