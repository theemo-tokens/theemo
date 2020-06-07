import { TextStyleAdapter } from '../../src/styles/text';
import { StyleTypes } from '../../src/styles/types';
import { container } from '../mocks/container';

describe('Styles | Text', () => {
  
  let origin: TextStyle;
  let node: TextNode;
  let adapter: TextStyleAdapter;

  beforeEach(() => {
    origin = figma.createTextStyle();
    origin.name = 'origin-style';
    origin.fontSize = 16;
    origin.letterSpacing = {
      value: 1.5,
      unit: 'PERCENT'
    };
    
    node = figma.createText();
    adapter = new TextStyleAdapter(node, container);
  });

  afterEach(() => {
    node.remove();

    const paintStyles = figma.getLocalTextStyles();
    while (paintStyles.length > 0) {
      paintStyles.pop().remove();
    }
  });

  test('correct properties', () => {
    expect(adapter.type).toBe(StyleTypes.Text);
    expect(adapter.collection).toBe('text');
    expect(adapter.getPool()).toStrictEqual(figma.getLocalTextStyles());
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
    node.textStyleId = origin.id;
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
    adapter.createReference(origin.id, 'text-reference');

    expect(adapter.from.name).toBe('origin-style');
    expect(adapter.from.id).toBe(origin.id);

    expect(adapter.local.name).toBe('text-reference');

    expect(adapter.local.name).toBe('text-reference');
    expect(adapter.to.id).toBe(adapter.local.id);
  });

  test('needs unlink?', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'text-reference');
    expect(adapter.needsUnlink()).toBeFalsy();

    node.textStyleId = '';
    adapter.read();
    expect(adapter.needsUnlink()).toBeTruthy();
  });

  test('unlink reference', () => {
    adapter.linkOrigin('origin-style');
    adapter.createReference(origin.id, 'text-reference');
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