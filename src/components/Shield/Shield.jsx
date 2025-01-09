import PropTypes from 'prop-types';
const Shield = (props) => (
  <img
    alt="webpack shield"
    src={`https://img.shields.io/${props.content}.svg?label=${props.label}&style=flat-square&maxAge=3600`}
  />
);
Shield.propTypes = {
  content: PropTypes.string,
  label: PropTypes.string,
};
export default Shield;
