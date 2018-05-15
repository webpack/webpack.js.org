// Import External Dependencies
import React from 'react';

// Import Utilities
import isClient from '../../utilities/is-client';

// Load Styling
import '../Gitter/Gitter.scss';

// Create and export component
export default class Gitter extends React.Component {
  _sidecar = null

  render() {
    return (
      <div className="gitter">
        <div className="gitter__button js-gitter-toggle-chat-button">
          <i className="gitter__icon icon-gitter" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (isClient) {
      import('gitter-sidecar').then(Sidecar => {
        this._sidecar = new Sidecar({
          room: 'webpack/webpack',
          activationElement: false
        });
      });
    }
  }
}
