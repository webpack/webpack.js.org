import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'

const theme = {
  baseFontSize: '16px',
  scaleRatio: 2.5,
  bodyWeight: 400,
  boldWeight: 700,
  headerWeight: 700,
  bodyFontFamily: ['Cabin', 'Century Gothic', 'sans-serif'],
  headerFontFamily: ['Geomanist', 'Century Gothic', 'sans-serif'],
  googleFonts: [
    {
      name: 'Cabin',
      styles: [
        '400',
        '400i',
        '700',
      ],
    },
    {
      name: 'Averia Sans Libre',
      styles: [
        '300',
      ],
    },
    {
      name: 'Ubuntu Mono',
      styles: [
        '400',
      ],
    },
  ],
  plugins: [
    new CodePlugin(),
  ],
  overrideStyles: ({ rhythm, scale }) => ({
    'figure': {
      marginBottom: 0,
    },
    pre: {
      background: '#333333',
      color: 'white',
    },
    blockquote: {
      paddingLeft: rhythm(3/4),
      paddingTop: rhythm(1/2),
      paddingBottom: rhythm(1/2),
      marginLeft: 0,
      marginRight: 0,
      borderLeft: `${rhythm(1/4)} solid #CCC`,
    },
    'blockquote.warning,blockquote.todo,blockquote.tip': {
      marginLeft: 0,
      marginTop: 0,
      padding: rhythm(1),
    },
    'h2 code': {
      ...scale(3/5),
    },
    'h3 code': {
      ...scale(2/5),
    },
    'h4 code': {
      ...scale(0/5),
    },
    'h5 code': {
      ...scale(-1/5),
    },
    hr: {
      background: '#dedede',
      height: '3px',
    },
    'tt,code': {
      fontFamily: '"Ubuntu Mono", Consolas,"Roboto Mono","Liberation Mono",Menlo,Courier,monospace',
    },
  }),
}

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

module.exports = typography
