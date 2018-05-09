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
        <div
          className="gitter__button"
          onClick={() => window.gitterSidecar && window.gitterSidecar.toggleChat(true)}>
          <i className="gitter__icon icon-gitter" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if ( window.document !== undefined ) {
      if (!window.gitterLoadTriggered) {
        window.gitterLoadTriggered = true;
        import('gitter-sidecar').then(Sidecar => {
          window.gitterSidecar = new Sidecar({
            room: 'webpack/webpack',
            activationElement: false
          });
        });
      }
    }
  }
}
