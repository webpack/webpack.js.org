import React from 'react';
import Cube from '../cube/cube';
import './logo-style';

export default class Logo extends React.Component {
  constructor(props) {
    super(props);

    this.listeners = {
      spin: this._triggerSpin.bind(this),
      reset: this._triggerReset.bind(this)
    };
  }

  render() {
    let { theme = 'dark' } = this.props;

    return (
      <span 
        ref={ ref => this.container = ref } 
        className={ `logo logo--${theme}` }>
        <Cube 
          ref={ ref => this.icon = ref }
          className="logo__cube"
          theme={ theme } 
          depth={ 20 } />
        <span className="logo__text">webpack</span>
      </span>
    );
  }

  componentDidMount() {
    this.container.addEventListener('mouseenter', this.listeners.spin);
    this.container.addEventListener('mouseleave', this.listeners.reset);
  }

  componentWillUnmount() {
    this.container.removeEventListener('mouseenter', this.listeners.spin);
    this.container.removeEventListener('mouseleave', this.listeners.reset);
  }

  /**
   * Proxy to Cube's spin method
   *
   * @param {object} e - Native event
   */
  _triggerSpin(e) {
    this.icon.spin(e);
  }

  /**
   * Proxy to Cube's reset method
   *
   * @param {object} e - Native event
   */
  _triggerReset(e) {
    this.icon.reset(e);
  }     
}
