import numberjack from '../numberjack';

describe('numberjack', () => {
  test('read', () => {
    expect(numberjack(3300000000).read()).toBe('33억원');
    expect(numberjack(330000000).read()).toBe('3억3,000만원');
    expect(numberjack(33300000).read()).toBe('3,330만원');
    expect(numberjack(3300).read()).toBe('3,300원');
  })
});
