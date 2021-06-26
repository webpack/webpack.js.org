const list2Tree = require('./index');
describe('list2Tree', () => {
  it('should return data without any children', () => {
    const anchors = [
      { title: 'hd2.1', level: 2 },
      { title: 'hd2.2', level: 2 },
    ];
    expect(list2Tree('', anchors)).toEqual([
      { title: 'hd2.1', level: 2, title2: 'hd2.1' },
      { title: 'hd2.2', level: 2, title2: 'hd2.2' },
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
        title2: 'hd2.1',
        level: 2,
        children: [
          { title: 'hd3.1', title2: 'hd3.1', level: 3 },
          {
            title: 'hd3.2',
            title2: 'hd3.2',
            level: 3,
            children: [{ title: 'hd4.1', title2: 'hd4.1', level: 4 }],
          },
        ],
      },
      { title: 'hd2.2', title2: 'hd2.2', level: 2 },
    ]);
  });

  it('should replace parent part with empty', () => {
    const anchors = [
      {
        title: 'h2',
        level: 2,
      },
      {
        title: 'h2.my-heading3',
        level: 3,
      },
      {
        title: 'h2my-heading3',
        level: 3,
      },
      {
        title: 'my-heading3h2.hello',
        level: 3,
      },
    ];
    expect(list2Tree('', anchors)).toEqual([
      {
        title: 'h2',
        title2: 'h2',
        level: 2,
        children: [
          {
            title: 'h2.my-heading3',
            title2: 'my-heading3',
            level: 3,
          },
          {
            title: 'h2my-heading3',
            title2: 'h2my-heading3',
            level: 3,
          },
          {
            title: 'my-heading3h2.hello',
            title2: 'my-heading3h2.hello',
            level: 3,
          },
        ],
      },
    ]);
  });
});
