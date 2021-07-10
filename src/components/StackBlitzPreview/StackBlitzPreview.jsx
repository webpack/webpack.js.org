import PropTypes from 'prop-types';
import openButton from '../../assets/open-in-stackblitz-button.svg';

StackBlitzPreview.propTypes = {
  description: PropTypes.string,
  example: PropTypes.string,
};

export default function StackBlitzPreview(props = {}) {
  const {
    example = '',
    description = 'Check out this guide live on StackBlitz.',
  } = props;

  const url = `https://stackblitz.com/github/webpack/webpack.js.org/tree/master/examples/${example}`;

  return (
    <aside className="preview">
      <h6 className="preview__prefix">live preview</h6>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={openButton} alt="Open in StackBlitz" />
      </a>
    </aside>
  );
}
