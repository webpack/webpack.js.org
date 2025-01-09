import PropTypes from 'prop-types';
BrandingSample.propTypes = {
  color: PropTypes.string.isRequired,
};
export default function BrandingSample({ color }) {
  return <div style={{ backgroundColor: color }}>&nbsp;</div>;
}
