const findTopLevel = require('./findTopLevel');
describe('findTopLevel', () => {
  test('should return level 1', () => {
    expect(findTopLevel([{ level: 1 }, { level: 2 }])).toBe(1);
  });
  test('should be undefined', () => {
    expect(findTopLevel([])).toBeUndefined();
  });
});
