export function canHandleNode(node: SceneNode) {
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