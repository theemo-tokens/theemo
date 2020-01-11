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

export function copyGridStyle(from: GridStyle, to: GridStyle) {
  to.layoutGrids = from.layoutGrids;
}

export function copyTextStyle(from: TextStyle, to: TextStyle) {
  to.fontName = from.fontName;
  to.fontSize = from.fontSize;
  to.letterSpacing = from.letterSpacing;
  to.lineHeight = from.lineHeight;
  to.paragraphIndent = from.paragraphIndent;
  to.paragraphSpacing = from.paragraphSpacing;
  to.textCase = from.textCase;
  to.textDecoration = from.textDecoration;
}
