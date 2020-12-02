import PropTypes from 'prop-types';
Badge.propTypes = {
  text: PropTypes.string.isRequired,
};
// seems like css are not imported after built
// hence use inlined styles to work around
export default function Badge(props) {
  return (
    <span
      style={{
        backgroundColor: ' #1d78c1',
        padding: '0 6px',
        borderRadius: '2px',
        color: '#fff',
        position: 'relative',
        top: '-4px',
      }}
    >
      {props.text}
    </span>
  );
}
