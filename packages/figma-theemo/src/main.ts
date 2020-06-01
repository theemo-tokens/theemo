import Commander from './commander';
import Emitter from './emitter';
import NodeManager, { RefNode } from './manager/node-manager';

figma.showUI(__html__, {
  width: 380,
  height: 350
});

const emitter = new Emitter();
const commander = new Commander(emitter);

commander.run('migrate');
commander.run('read-settings');

// handle selection
handleSelection(figma.currentPage.selection);
figma.on('selectionchange', () => {
  if (!handleSelection(figma.currentPage.selection)) {
    emitter.sendEvent('selection-changed', null);
  }
});

function handleSelection(selection: readonly SceneNode[]) {
  if (selection.length > 0 && NodeManager.canHandleNode(selection[0])) {
    const manager = new NodeManager(selection[0] as RefNode);
    emitter.sendEvent('selection-changed', manager.data);
    return true;
  } else {
    return false;
  }
}