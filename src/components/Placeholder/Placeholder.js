import './Placeholder.scss';

// Placeholder string
const PlaceholderString = () => `
  <div class="placeholder">
    <p class="placeholder__medium">&nbsp;</p>
    <p class="placeholder__large">&nbsp;</p>
    <p class="placeholder__small">&nbsp;</p>
    <h2 class="placeholder__xsmall">&nbsp;</h2>
    <p class="placeholder__large">&nbsp;</p>
    <p class="placeholder__small">&nbsp;</p>
    <p class="placeholder__medium">&nbsp;</p>
    <h2 class="placeholder__small">&nbsp;</h2>
    <p class="placeholder__large">&nbsp;</p>
    <p class="placeholder__medium">&nbsp;</p>
    <p class="placeholder__xsmall">&nbsp;</p>
    <h2 class="placeholder__xsmall">&nbsp;</h2>
    <p class="placeholder__large">&nbsp;</p>
    <p class="placeholder__small">&nbsp;</p>
    <p class="placeholder__medium">&nbsp;</p>
  </div>
`;

function PlaceholderComponent() {
  return (
    <div className="placeholder">
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  );
}

export { PlaceholderString, PlaceholderComponent };
