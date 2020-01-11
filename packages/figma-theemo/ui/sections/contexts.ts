import Section from './section';

export default class ContextsSection extends Section {
  name = 'contexts';

  setup() {
    this.renderContexts();

    document.getElementById('context-add').onsubmit = (e) => {
      e.preventDefault();

      const input = (document.getElementById('context-name') as HTMLInputElement);

      this.messenger.send('add-context', input.value);

      input.value = '';
    }
  }

  updateSettings() {
    this.renderContexts();
  }

  renderContexts() {
    // clear first
    const list = document.getElementById('context-list');
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // append
    for (const ctx of this.settings.get('contexts')) {
      const template = document.getElementById('context.item') as HTMLTemplateElement;
      const node = document.importNode(template.content, true).firstElementChild;

      node.querySelector('.name').innerHTML = ctx;
      node.querySelector('.remove').addEventListener('click', (e) => {
        e.stopPropagation();
        this.messenger.send('remove-context', ctx);
      }, false);

      node.addEventListener('click', () => {
        this.messenger.send('select-context', ctx);
      }, false);

      list.appendChild(node);
    }
  }
}