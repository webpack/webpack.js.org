// Import External Dependencies
import React from 'react';

// Import Utilities
import isClient from '../../utilities/is-client';

// Load Styling
import '../Gitter/Gitter.scss';

let sidecar = null;

// Create and export component
export default class Gitter extends React.Component {
  render() {
    return (
      <div className="gitter">
        <div
          className="gitter__button"
          onClick={this._handleIconClick}>
          <i className="gitter__icon icon-gitter" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (isClient) {
      import('gitter-sidecar').then(Sidecar => {
        if (!sidecar) {
          sidecar = new Sidecar.default({
            room: 'webpack/webpack',
            activationElement: false
          });
        }
      });
    }
  }

  _handleIconClick = () => {
    sidecar && sidecar.toggleChat(true);
  }
}
