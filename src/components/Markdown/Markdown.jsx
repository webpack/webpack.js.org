import './Markdown.scss';
import PropTypes from 'prop-types';

const Markdown = (props) => <div className="markdown">{props.children}</div>;
Markdown.propTypes = {
  children: PropTypes.node,
};
export default Markdown;
