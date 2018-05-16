// Import External Dependencies
import React from 'react';

// Import Utilities
import isClient from '../../utilities/is-client';

// Load Styling
import '../Gitter/Gitter.scss';

let sidecar = false;

// Create and export component
export default class Gitter extends React.Component {
  componentDidMount() {
    if (isClient) {
      import('gitter-sidecar').then(Sidecar => {
        if (!sidecar) {
          sidecar = new Sidecar({
            room: 'webpack/webpack',
            activationElement: false
          });
        }
      });
    }
  }

  handleIconClick = () => sidecar && sidecar.toggleChat(true);

  render() {
    return (
      <div className="gitter">
        <div
          className="gitter__button"
          onClick={this.handleIconClick}>
          <i className="gitter__icon icon-gitter" />
        </div>
      </div>
    );
  }
}
