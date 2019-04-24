import React from 'react';
import VisibilitySensor from '../VisibilitySensor/VisibilitySensor';
import SmallIcon from '../../assets/icon-square-small-slack.png';
import './Contributors.scss';

export default class Contributors extends VisibilitySensor {
  render() {
    const { isVisible } = this.state;
    const { contributors } = this.props;
    
    if (!contributors.length) {
      return <noscript />;
    }
  
    return (
      <div className="contributors" ref={ this.visibilityTarget }>
        <div className="contributors__list">
          {
            contributors.map(contributor => (
              <a key={ contributor }
                className="contributor"
                href={ `https://github.com/${contributor}` }>
                <img alt={ contributor }
                  src={ isVisible ? `https://github.com/${contributor}.png?size=90` : SmallIcon } />
                <span className="contributor__name"> {contributor}</span>
              </a>
            ))
          }
        </div>
      </div>
    );
  }
}
