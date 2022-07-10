import Messenger from './messenger';
import ContextsSection from './sections/contexts';
import Section from './sections/section';
import SelectionSection from './sections/selection';
import SettingsSection from './sections/settings';
import ToolsSection from './sections/tools';
import { DEFAULT_CONFIG } from '../shared/config';
import HelpSection from './sections/help';
import StatsSection from './sections/stats';

export default class SectionManager {
  private sections: Map<string, Section> = new Map();
  private messenger: Messenger;
  private settings: Map<string, any> = new Map(Object.entries(DEFAULT_CONFIG));

  constructor(messenger: Messenger) {
    this.messenger = messenger;

    this.registerSection(new SelectionSection(messenger, this.settings));
    this.registerSection(new ToolsSection(messenger, this.settings));
    this.registerSection(new ContextsSection(messenger, this.settings));
    this.registerSection(new SettingsSection(messenger, this.settings));
    this.registerSection(new HelpSection(messenger, this.settings));
    this.registerSection(new StatsSection(messenger, this.settings));

    this.setup();
  }

  private setup() {
    // setup nav
    for (const nav of document.querySelectorAll('[data-section]')) {
      nav.addEventListener('click', (e) => {
        this.activate((e.target as HTMLElement).dataset.section);
      }, false);
    }


    // check on settings
    this.messenger.addListener('settings-arrived', (data) => {
      for (const key of Object.keys(data)) {
        this.settings.set(key, data[key]);
      }
      this.updateSettings(this.settings);
    });
  }

  private registerSection(section: Section) {
    this.sections.set(section.name, section);
  }

  updateSettings(settings) {
    this.settings = settings;

    for (const section of this.sections.values()) {
      section.updateSettings(settings);
    }
  }

  activate(name: string) {
    if (!this.sections.has(name)) {
      return;
    }

    // handle nav
    for (const item of document.querySelectorAll('[data-section]')) {
      item.classList.remove('section-title');
      item.classList.add('label');
    }

    const link = document.querySelector(`[data-section=${name}]`);
    link.classList.remove('label');
    link.classList.add('section-title');

    // handle sections
    for (const section of document.getElementsByTagName('section')) {
      section.style.display = section.id === name ? 'flex' : 'none';
    }

    this.sections.get(name).activate();
  }
}