import { NAMESPACE } from './config';

export function createOrFindStyle(name: string, type: 'paint' | 'effect'): BaseStyle {
  switch (type) {
    case 'paint':
      let paint = figma.getLocalPaintStyles().find(style => style.name === name);
      if (!paint) {
        paint = figma.createPaintStyle();
        paint.name = name;
      }
      return paint;

    case 'effect':
      let effect = figma.getLocalEffectStyles().find(style => style.name === name);
      if (!effect) {
        effect = figma.createEffectStyle();
        effect.name = name;
      }
      return effect;
  }
}

export function copyPaintStyle(from: PaintStyle, to: PaintStyle) {
  to.paints = from.paints;
}

export function copyEffectStyle(from: EffectStyle, to: EffectStyle) {
  to.effects = from.effects;
}

export function readNodes(): Set<string> {
  return new Set<string>(Array.from(JSON.parse(figma.root.getSharedPluginData(NAMESPACE, 'nodes') || '[]')));
}

export function storeNodes(nodes: Set<string>) {
  figma.root.setSharedPluginData(NAMESPACE, 'nodes', JSON.stringify(Array.from(nodes.values())));
}
