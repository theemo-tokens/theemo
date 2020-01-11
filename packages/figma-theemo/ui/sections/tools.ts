import Section from './section';

export default class ToolsSection extends Section {
  name = 'tools';

  private button: HTMLInputElement;
  private autoUpdate = true;

  setup() {
    this.button = document.getElementById('export') as HTMLInputElement;

    this.button.addEventListener('click', () => {
      this.collect();
    });

    this.messenger.addListener('references-collected', async (data) => {
      await this.export(data);
    });

    setInterval(() => {
      if (this.autoUpdate) {
        this.messenger.send('update-styles');
      }
    }, 60);

    document.getElementById('tools.update').addEventListener('change', (e) => {
      this.autoUpdate = (e.target as HTMLInputElement).checked;
    }, false);
  }

  updateSettings(settings) {
    this.button.disabled = !(settings.get('tools.jsonbin.key') && settings.get('tools.jsonbin.url'));
  }

  private collect() {
    this.messenger.send('collect-references');
  }

  private async export(references) {
    await fetch(this.settings.get('tools.jsonbin.url'), {
      method: 'PUT',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
        'secret-key': this.settings.get('tools.jsonbin.key'),
        'versioning': false
      },
      body: JSON.stringify(references)
    });

    this.messenger.send('notify', 'Style References exported');
  }
}