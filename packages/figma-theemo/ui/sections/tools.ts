import Section from './section';

export default class ToolsSection extends Section {
  name = 'tools';

  private exportButton: HTMLInputElement;
  private importButton: HTMLInputElement;
  private importUrl: HTMLInputElement;
  private autoUpdate = false;

  private updateThreadId;

  setup() {
    let counter = 1;
    // values to control thread refresh frequency
    const base = 120;
    const ratio = 1.1;
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

      const interval = base + result.total * ratio;

      this.updateThreadId = setInterval(() => {
        if (this.autoUpdate) {
          // counter mechanics to give figma some time to breath and actually
          // save the changes
          counter++;
          if (counter >= 50 && counter < 60) {
            return;
          }
          if (counter === 60) {
            counter = 0;
          }
          this.messenger.send('update-styles');
        }
      }, interval);
    });
    this.messenger.send('collect-stats');

    document.getElementById('tools.update').addEventListener('change', (e) => {
      this.autoUpdate = (e.target as HTMLInputElement).checked;
      this.messenger.send('save-settings', {
        'tools.auto-update-references': this.autoUpdate
      });
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
    this.exportButton.disabled = !(settings.get('tools.jsonbin.key') && settings.get('tools.jsonbin.id'));
    this.importButton.disabled = !settings.get('tools.jsonbin.key');
    this.importUrl.disabled = !settings.get('tools.jsonbin.key');

    // set auto update
    this.autoUpdate = settings.get('tools.auto-update-references');
    (document.getElementById('tools.update') as HTMLInputElement).checked = this.autoUpdate;
  }

  private collect() {
    this.messenger.send('collect-references');
  }

  private async export(references) {
    // export data 
    await this.exportData(references);

    // set name
    const name = references.document?.name;
    if (name) {
      await this.exportName(name);
    }

    this.messenger.send('notify', 'Style References exported');
  }

  private async exportData(references) {
    const id = this.settings.get('tools.jsonbin.id');
    const url = `https://api.jsonbin.io/v3/b/${id}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': this.settings.get('tools.jsonbin.key')
      },
      body: JSON.stringify(references)
    });
  }

  private async exportName(name) {
    const id = this.settings.get('tools.jsonbin.id');
    const url = `https://api.jsonbin.io/v3/b/${id}/meta/name`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'X-Master-Key': this.settings.get('tools.jsonbin.key'),
        'X-Bin-Name': name
      }
    });
  }

  private async import(idOrUrl) {
    const url = idOrUrl.startsWith('https://') ? idOrUrl : `https://api.jsonbin.io/v3/b/${idOrUrl}`;
    try {
      const response = await fetch(url, {
        headers: {
          'X-Master-Key': this.settings.get('tools.jsonbin.key')
        }
      });
      const data = await response.json();
      this.messenger.send('import', data.record);
    } catch (e) {
      this.messenger.send('nofity', `Problem fetching data from ${url}`);
    }
  }
}