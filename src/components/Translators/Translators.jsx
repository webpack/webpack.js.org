import { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import SmallIcon from '../../assets/icon-square-small-slack.png';
import './Translators.scss';
import PropTypes from 'prop-types';

export default class Translators extends Component {
  static propTypes = {
    translators: PropTypes.array,
  };
  state = {
    inView: false,
  };

  handleInView = (inView) => {
    if (!inView) {
      return;
    }
    this.setState({ inView });
  };

  render() {
    const { inView } = this.state;
    const { translators } = this.props;

    if (!translators.length) {
      return <noscript />;
    }

    return (
      <VisibilitySensor
        delayedCall
        partialVisibility
        intervalDelay={300}
        onChange={this.handleInView}
      >
        <div className="translators">
          <div className="translators__list">
            {translators.map((translator) => (
              <a
                key={translator}
                className="translator"
                href={`https://github.com/${translator}`}
              >
                <img
                  alt={translator}
                  src={
                    inView
                      ? `https://github.com/${translator}.png?size=90`
                      : SmallIcon
                  }
                />
                <span className="translator__name"> {translator}</span>
              </a>
            ))}
          </div>
        </div>
      </VisibilitySensor>
    );
  }
}
