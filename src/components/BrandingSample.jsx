import PropTypes from "prop-types";

export default function BrandingSample({ color }) {
  return <div style={{ backgroundColor: color }}>&nbsp;</div>;
}

BrandingSample.propTypes = {
  color: PropTypes.string.isRequired,
};
