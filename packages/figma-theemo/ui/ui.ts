import 'figma-plugin-ds/dist/figma-plugin-ds.css'
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