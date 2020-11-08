// Import External Dependencies
import React from 'react';

// Import Utilities
import isClient from '../../utilities/is-client';

// Load Styling
import '../Gitter/Gitter.scss';

import GitterIcon from '../../styles/icons/gitter.svg';

let sidecar = null;
let sidecarLoadTriggered = false;

// Create and export component
export default class Gitter extends React.Component {
  render() {
    return (
      <div className="gitter">
        <div
          className="gitter__button"
          onClick={this._handleIconClick}>
          <GitterIcon className="gitter__icon" fill='white' />
        </div>
      </div>
    );
  }

  _handleIconClick = () => {
    if (!isClient) {
      return false;
    }

    if (!sidecarLoadTriggered) {
      sidecarLoadTriggered = true;
      import('gitter-sidecar').then(Sidecar => {
        sidecar = new Sidecar.default({
          room: 'webpack/webpack',
          activationElement: false
        });
        sidecar.toggleChat(true);
      });
    } else if (sidecar) {
      sidecar.toggleChat(true);
    }
  }
}
