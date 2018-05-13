// Import Dependencies
import FontFaceObserver from 'fontfaceobserver';

// Import Styling
import('./styles/fonts.scss');

const bodyStackNormal = new FontFaceObserver('Source Sans Pro', {
  weight: 400
});

const bodyStackNormalItalic = new FontFaceObserver('Source Sans Pro', {
  weight: 400,
  style: 'italic'
});

const bodyStackMedium = new FontFaceObserver('Source Sans Pro', {
  weight: 600
});

const bodyStack = Promise
  .all([ bodyStackNormal.load(), bodyStackNormalItalic.load(), bodyStackMedium.load() ])
  .then(() => {
    document.documentElement.classList.add('source-sans-ready');
  });

const headingStack = new FontFaceObserver('Geomanist', { weight: 600 })
  .load()
  .then(() => {
    document.documentElement.classList.add('geomanist-ready');
  });
