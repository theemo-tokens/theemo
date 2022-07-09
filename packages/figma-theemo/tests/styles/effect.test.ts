import { EffectStyleAdapter } from '../../src/styles/effect';
import { StyleTypes } from '../../src/styles/types';
import { container } from '../mocks/container';

describe('Styles | Effect', () => {
  
  let origin: EffectStyle;
  let node: RectangleNode;
  let adapter: EffectStyleAdapter;

  beforeEach(() => {
    origin = figma.createEffectStyle();
    origin.name = 'origin-style';
    origin.effects = [
      {
        type: "DROP_SHADOW",
        blendMode: "COLOR",
        color: {
          r: 255,
          g: 0,
          b: 0,
          a: 0.5
        },
        offset: {
          x: 0,
          y: 0
        },
        radius: 10,
        visible: true
      }
    ]
    node = figma.createRectangle();
    adapter = new EffectStyleAdapter(node, container);
  });

  afterEach(() => {
    node.remove();

    const paintStyles = figma.getLocalEffectStyles();
    while (paintStyles.length > 0) {
      paintStyles.pop().remove();
    }
  });

  test('correct properties', () => {
    expect(adapter.type).toBe(StyleTypes.Effect);
    expect(adapter.collection).toBe('effect');
    expect(adapter.getPool()).toStrictEqual(figma.getLocalEffectStyles());
  });

  test('test empty styles', () => {
    expect(adapter.from).toBeUndefined();
    expect(adapter.to).toBeUndefined();
    expect(adapter.local).toBeUndefined();
    expect(adapter.context).toBeUndefined();
    expect(adapter.hasReference()).toBeFalsy();
    expect(adapter.needsUnlink()).toBeFalsy();
  });

  test('set local style', () => {
    node.effectStyleId = origin.id;
    adapter.read();

    expect(adapter.local.name).toBe('origin-style');
    expect(adapter.local.id).toBe(origin.id);
  });

  // --- references

  test('link origin', () => {
    adapter.linkOrigin('origin-style');

    expect(adapter.local.name).toBe('origin-style');
    expect(adapter.local.id).toBe(origin.id);
  });

  test('create reference', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'effect-reference');

    expect(adapter.from.name).toBe('origin-style');
    expect(adapter.from.id).toBe(origin.id);

    expect(adapter.local.name).toBe('effect-reference');

    expect(adapter.local.name).toBe('effect-reference');
    expect(adapter.to.id).toBe(adapter.local.id);
  });

  test('needs unlink?', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'effect-reference');
    expect(adapter.needsUnlink()).toBeFalsy();

    node.effectStyleId = '';
    adapter.read();
    expect(adapter.needsUnlink()).toBeTruthy();
  });

  test('unlink reference', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'effect-reference');
    const from = adapter.from;
    adapter.unlinkReference();

    expect(adapter.from).toBeUndefined();
    expect(adapter.to).toBeUndefined();
    expect(adapter.local.id).toBe(from.id);
  });

  // --- contexts

  test('is contextual', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'fill-reference');

    adapter.to.name = 'style.$bar';
    expect(adapter.isContextual('bar')).toBeTruthy();
    expect(adapter.isContextual('foo')).toBeFalsy();

    // non existing context
    adapter.to.name = 'style.$bam';
    expect(adapter.isContextual('bar')).toBeFalsy();
    expect(adapter.isContextual('foo')).toBeFalsy();

    adapter.to.name = 'style.$foo';
    expect(adapter.isContextual('bar')).toBeFalsy();
    expect(adapter.isContextual('foo')).toBeTruthy();
  });

  test('apply for context', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'reference.$bar');

    adapter.applyForContext('bar');

    expect(adapter.context).toBeDefined();
    expect(adapter.context.name).toBe('reference');
  });
});