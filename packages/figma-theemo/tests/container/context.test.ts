import { container } from '../mocks/container';

describe('Container | Context', () => {
  const contexts = container.contexts;

  test('isContextualName', () => {
    expect(contexts.isContextualName('buuh')).toBeFalsy();
    expect(contexts.isContextualName('fwerg.$foo')).toBeTruthy();
    expect(contexts.isContextualName('frefre.$bar')).toBeTruthy();
    expect(contexts.isContextualName('frefre$$$bar')).toBeFalsy();
  });

  test('getContextFromName', () => {
    expect(contexts.getContextFromName('buuuh')).toBeUndefined();
    expect(contexts.getContextFromName('buuuh.$bla')).toBeUndefined();
    expect(contexts.getContextFromName('buuuh.$bar')).toBe('bar');
    expect(contexts.getContextFromName('buuuh$$$bar')).toBeUndefined();
    expect(contexts.getContextFromName('buuuh.$foo')).toBe('foo');
  });
});