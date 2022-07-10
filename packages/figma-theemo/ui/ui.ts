import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './styles/layout.css';
import './styles/selection.css';
import './styles/tools.css';
import './styles/contexts.css';
import './styles/settings.css';
import './styles/stats.css';
import './styles/help.css';
import './ui.css'

import SectionManager from './section-manager';
import Messenger from './messenger';

const messenger = new Messenger();
const manager = new SectionManager(messenger);

manager.activate('tools');

messenger.addListener('selection-changed', (data) => {
  if (data === null) {
    manager.activate('tools');
  } else {
    manager.activate('selection');
  }
});