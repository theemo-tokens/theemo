import { FillStyleAdapter } from '../../src/styles/fill';
import { container } from '../mocks/container';
import { StyleTypes } from '../../src/styles/types';

describe('Styles | Fill', () => {
  
  let origin: PaintStyle;
  let node: RectangleNode;
  let adapter: FillStyleAdapter;

  beforeEach(() => {
    origin = figma.createPaintStyle();
    origin.name = 'origin-style';
    origin.paints = [
      {
        type: "SOLID",
        color: {
          r: 0,
          g: 0,
          b: 0,
        },
        visible: true
      }
    ];
    node = figma.createRectangle();
    adapter = new FillStyleAdapter(node, container);
  });

  afterEach(() => {
    node.remove();

    const paintStyles = figma.getLocalPaintStyles();
    while (paintStyles.length > 0) {
      paintStyles.pop().remove();
    }
  });

  test('correct properties', () => {
    expect(adapter.type).toBe(StyleTypes.Fill);
    expect(adapter.collection).toBe('paint');
    expect(adapter.getPool()).toStrictEqual(figma.getLocalPaintStyles());
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
    node.fillStyleId = origin.id;
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
    adapter.createReference(origin.id, 'fill-reference');

    expect(adapter.from.name).toBe('origin-style');
    expect(adapter.from.id).toBe(origin.id);

    expect(adapter.local.name).toBe('fill-reference');

    expect(adapter.local.name).toBe('fill-reference');
    expect(adapter.to.id).toBe(adapter.local.id);
  });

  test('needs unlink?', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'fill-reference');
    expect(adapter.needsUnlink()).toBeFalsy();

    node.fillStyleId = '';
    adapter.read();
    expect(adapter.needsUnlink()).toBeTruthy();
  });

  test('unlink reference', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'fill-reference');
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