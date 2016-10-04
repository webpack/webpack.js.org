export default [
  { title: 'Concepts', url: '/concepts/' },
  { title: 'Configuration', url: '/configuration/' },
  { title: 'How to', url: '/how-to/' },
  { title: 'API', url: '/api/' },
];

export const basepath = (path) => path.split('/').filter((split) => split !== '').slice(0, 1)[0]
