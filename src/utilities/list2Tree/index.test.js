const list2Tree = require('./index');
describe('list2Tree', () => {
  it('should return data without any children', () => {
    const anchors = [
      { title: 'hd2.1', level: 2 },
      { title: 'hd2.2', level: 2 },
    ];
    expect(list2Tree('', anchors)).toEqual([
      { title: 'hd2.1', level: 2 },
      { title: 'hd2.2', level: 2 },
    ]);
  });
  it('should return data with children', () => {
    const anchors = [
      { title: 'hd2.1', level: 2 },
      { title: 'hd3.1', level: 3 },
      { title: 'hd3.2', level: 3 },
      { title: 'hd4.1', level: 4 },
      { title: 'hd2.2', level: 2 },
    ];
    expect(list2Tree('', anchors)).toEqual([
      {
        title: 'hd2.1',
        level: 2,
        children: [
          { title: 'hd3.1', level: 3 },
          {
            title: 'hd3.2',
            level: 3,
            children: [{ title: 'hd4.1', level: 4 }],
          },
        ],
      },
      { title: 'hd2.2', level: 2 },
    ]);
  });
});
