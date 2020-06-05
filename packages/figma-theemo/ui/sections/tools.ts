import Section from './section';

export default class ToolsSection extends Section {
  name = 'tools';

  private exportButton: HTMLInputElement;
  private importButton: HTMLInputElement;
  private importUrl: HTMLInputElement;
  private autoUpdate = true;

  private updateThreadId;

  setup() {
    this.messenger.addListener('stats-collected', (result) => {
      // the auto-update "thread"
      // fires "constantly" update commands to the plugin
      // not gonna use `requestAnimationFrame` here on purpose!
      // be able to control the update interval here!
      // -> maybe make it an option somewhen

      // for now interval time is dynamic and depends on the number
      // of references to NOT freeze figma
      if (this.updateThreadId) {
        window.clearInterval(this.updateThreadId);
      }

      const interval = 60 + result.total * 1.1;

      this.updateThreadId = setInterval(() => {
        if (this.autoUpdate) {
          this.messenger.send('update-styles');
        }
      }, interval);
    });
    this.messenger.send('collect-stats');

    document.getElementById('tools.update').addEventListener('change', (e) => {
      this.autoUpdate = (e.target as HTMLInputElement).checked;
    }, false);

    // export
    this.exportButton = document.getElementById('export') as HTMLInputElement;


    this.exportButton.addEventListener('click', () => {
      this.collect();
    });

    this.messenger.addListener('references-collected', async (data) => {
      await this.export(data);
    });

    // import
    this.importUrl = document.getElementById('import-url') as HTMLInputElement;
    this.importButton = document.getElementById('import-submit') as HTMLInputElement;
    document.getElementById('import').onsubmit = async (e) => {
      e.preventDefault();
      const input = (document.getElementById('import-url') as HTMLInputElement);
      await this.import(input.value);
      input.value = '';
    }
  }

  updateSettings(settings) {
    this.exportButton.disabled = !(settings.get('tools.jsonbin.key') && settings.get('tools.jsonbin.url'));
    this.importButton.disabled = !settings.get('tools.jsonbin.key');
    this.importUrl.disabled = !settings.get('tools.jsonbin.key');
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

  private async import(url) {
    try {
      const response = await fetch(url, {
        // @ts-ignore
        headers: {
          'Content-Type': 'application/json',
          'secret-key': this.settings.get('tools.jsonbin.key')
        }
      });
      const data = await response.json();
      this.messenger.send('import', data);
    } catch (e) {
      this.messenger.send('nofity', `Problem fetching data from ${url}`);
    }
  }
}