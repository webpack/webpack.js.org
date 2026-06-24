import PropTypes from "prop-types";
import openButton from "../../assets/open-in-stackblitz-button.svg";

export default function StackBlitzPreview(props = {}) {
  const {
    example = "",
    description = "جرّب هذا الدليل مباشرة على StackBlitz.",
  } = props;

  const url = `https://stackblitz.com/github/webpack/webpack.js.org/tree/main/examples/${example}`;

  return (
    <aside className="preview">
      <h6 className="preview__prefix">معاينة مباشرة</h6>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={openButton} alt="افتح في StackBlitz" />
      </a>
    </aside>
  );
}

StackBlitzPreview.propTypes = {
  description: PropTypes.string,
  example: PropTypes.string,
};
