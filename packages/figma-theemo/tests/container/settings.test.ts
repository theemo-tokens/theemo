import { settings } from '../mocks/container';

describe('Container | Settings', () => {
  test('test settings mock', () => {
    expect(settings.get('context.prefix')).toBe('.$');
  });
});