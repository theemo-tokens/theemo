/** @import {ThemeManager, Theme} from "@theemo/theme" */
import { ThemeManager, isBrowserFeature } from "@theemo/theme";

function loadTemplate(id) {
  const template = document.getElementById(id);
  return template.content.cloneNode(true);
}

class Themer {

  /** @type {ThemeManager} manager */
  manager;

  constructor() {
    this.manager = new ThemeManager({
      themeChanged: this.drawFeatures,
      featureChanged: () => {
        this.drawFeatures(this.manager.activeTheme);
      }
    });
    
    this.drawThemes();
  }

  
  drawThemes = () => {
    const themes = document.getElementById('themes');
  
    for (const theme of this.manager.themes) {
      const button = document.createElement('button');
      button.append(theme.name);
      button.addEventListener('click', () => {
        this.manager.switchTheme(theme.name);
      });
  
      themes.append(button);
    }
  }

  /** @param {Theme} theme */
  drawFeatures = (theme) => {
    const features = document.getElementById('features');

    features.replaceChildren();
  
    for (const feature of theme.features) {
      const principal = this.manager.getPrincipal(feature.name);
      const template = loadTemplate('feature');
      template.querySelector('legend').textContent = feature.name;
      template.querySelector('p').textContent = `Principal: ${principal}`;

      this.drawOptions(template.querySelector('#options'), feature);

      if (isBrowserFeature(feature) && principal === 'user') {
        const button = document.createElement('button');
        button.append('Unset Mode');
        button.addEventListener('click', () => {
          this.manager.unsetMode(feature.name);
        });

        template.querySelector('fieldset').append(button);
      }
      
      features.append(template);
    }
  }

  drawOptions = (parent, feature) => {
    parent.replaceChildren();

    for (const option of feature.options) {
      const opt = loadTemplate('option');
      const input = opt.querySelector('input');
      input.name = feature.name;
      input.value = option;
      input.checked = this.manager.featureValues[feature.name] === option;
      input.addEventListener('change', () => {
        this.manager.setMode(feature.name, option);
      })

      let label = option

      if (this.manager.browserFeatureValues[feature.name] === option) {
        label += ' (System)';
      }

      opt.querySelector('span').textContent = label

      parent.append(opt);
    }
  }

}



new Themer();