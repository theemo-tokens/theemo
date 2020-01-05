import Handler, { RefNode } from './handler';
import { readNodes, storeNodes } from './utils';
import { ALL_STYLES } from './styles/types';
import { NAMESPACE } from './config';

migrate();

function migrate() {
  // migrate from plugin data to shared plugin data
  const nodes = figma.root.getPluginData('nodes');
  if (nodes !== '') {
    for (const nodeId of JSON.parse(nodes)) {
      const node = figma.getNodeById(nodeId);
      if (node) {
        for (const style of ALL_STYLES) {
          node.setSharedPluginData(NAMESPACE, style, node.getPluginData(style));
          node.setPluginData(style, '');
        }
      }
    }

    figma.root.setSharedPluginData(NAMESPACE, 'nodes', nodes);
    figma.root.setPluginData('nodes', '');
  }
}

function handleSelection(node: RefNode) {
  const handler = new Handler(node as RefNode);
  figma.ui.postMessage(handler.data);

  figma.ui.onmessage = msg => {
    // check here if the node still exists or some other user has deleted it
    const exists = figma.getNodeById(node.id);
    if (!exists) {
      figma.closePlugin();
      return;
    }

    // if we are good, execute the commands
    switch (msg.command) {
      case 'link-origin':
        handler.linkOrigin(msg);
        figma.ui.postMessage({ event: 'origin-linked', style: msg.style, data: handler.data.styles[msg.style] });
        break;

      case 'unlink-origin':
        handler.unlinkOrigin(msg);
        figma.ui.postMessage({ event: 'origin-unlinked', style: msg.style, data: handler.data.styles[msg.style] });
        break;

      case 'migrate-origin':
        handler.migrateOrigin(msg);
        figma.ui.postMessage({ event: 'origin-migrated', style: msg.style, data: handler.data.styles[msg.style] });
        break;

      case 'create-reference':
        handler.createReference(msg);
        figma.ui.postMessage({ event: 'reference-created', style: msg.style, data: handler.data.styles[msg.style] });
        break;

      case 'unlink-reference':
        handler.unlinkReference(msg);
        figma.ui.postMessage({ event: 'reference-unlinked', style: msg.style, data: handler.data.styles[msg.style] });
        break;
    }
  };

  figma.ui.resize(400, 450);
}

function main() {
  const selection = figma.currentPage.selection;

  // show dialog
  if (selection.length > 0) {
    if (canHandleNode(selection[0])) {
      figma.showUI(__html__);
      handleSelection(selection[0] as RefNode);
    } else {
      figma.closePlugin('Selected node is not handled by Style References');
    }
  }

  // update what we got
  else {
    const nodes = readNodes();
    for (const id of nodes.values()) {
      const node = figma.getNodeById(id) as RefNode;
      if (node) {
        const handler = new Handler(node);
        handler.updateStyles();
      } else {
        nodes.delete(id);
      }
    }
    storeNodes(nodes);

    figma.closePlugin(`${nodes.size} Style Reference${nodes.size !== 1 ? 's' : ''} updated`);
  }
}

function canHandleNode(node: SceneNode) {
  return node.type === 'GROUP' ||
    node.type === 'COMPONENT' ||
    node.type === 'INSTANCE' ||
    node.type === 'VECTOR' ||
    node.type === 'STAR' ||
    node.type === 'LINE' ||
    node.type === 'ELLIPSE' ||
    node.type === 'POLYGON' ||
    node.type === 'RECTANGLE' ||
    node.type === 'TEXT';
}

main();