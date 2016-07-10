// Import Dependencies
import React, { Component } from 'react'

// Import Components
import Icon from 'Components/icon/icon'

// Export the "Logo" component
export default class Logo extends Component {
    constructor(props) {
        super(props)

        this.listeners = {
            spin: this._triggerSpin.bind(this),
            reset: this._triggerReset.bind(this)
        }
    }

    render() {
        return (
            <span className="logo" ref={ ref => this.container = ref }>
                <Icon ref={ ref => this.icon = ref } 
                    theme={ this.props.theme || 'dark' } 
                    depth={ 20 } />
                <span className={ `logo-text -${ this.props.theme || 'dark' }`}>Webpack</span>
            </span>
        )
    }

    componentDidMount() {
        this.container.addEventListener('mouseenter', this.listeners.spin)
        this.container.addEventListener('mouseleave', this.listeners.reset)
    }

    componentWillUnmount() {
        this.container.removeEventListener('mouseenter', this.listeners.spin)
        this.container.removeEventListener('mouseleave', this.listeners.reset)
    }

    /**
     * Proxy to Icon's spin method
     *
     * @param {object} e - Native event
     */
    _triggerSpin(e) {
        this.icon.spin(e)
    }

    /**
     * Proxy to Icon's reset method
     *
     * @param {object} e - Native event
     */
    _triggerReset(e) {
        this.icon.reset(e)
    }     
}



