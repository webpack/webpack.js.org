import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import SmallIcon from '../../assets/icon-square-small-slack.png';
import './Contributors.scss';

export default class Contributors extends React.Component {
  state = {
    inView: false
  }

  handleInView = (inView) => {
    if (!inView) {
      return;
    }
    this.setState({ inView });
  }

  render() {
    const { inView } = this.state;
    const { contributors } = this.props;
    
    if (!contributors.length) {
      return <noscript />;
    }
  
    return (
      <VisibilitySensor delayedCall
        partialVisibility
        intervalDelay={ 300 }
        onChange={ this.handleInView }>
        <div className="contributors">
          <div className="contributors__list">
            {
              contributors.map(contributor => (
                <a key={ contributor }
                  className="contributor"
                  href={ `https://github.com/${contributor}` }>
                  <img alt={ contributor }
                    src={ inView ? `https://github.com/${contributor}.png?size=90` : SmallIcon } />
                  <span className="contributor__name"> {contributor}</span>
                </a>
              ))
            }
          </div>
        </div>
      </VisibilitySensor>
    );
  }
}
