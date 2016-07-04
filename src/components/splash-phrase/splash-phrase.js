// Import Dependencies
import React, { Component } from 'react'

// Load Styling
import './splash-phrase-style'

// Export the "SplashPhrase" component
export default class SplashPhrase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rotation: 0
        }
    }

    render() {
        return (
            <div className="splash-phrase">
                Webpack, the
                <span className="splash-phrase-carousel" 
                    ref={ ref => this.carousel = ref }
                    style={{ transform: `rotateX(${ this.state.rotation }deg)` }}>
                    <span className="splash-phrase-carousel-item">flexible</span>
                    <span className="splash-phrase-carousel-item">extensible</span>
                    <span className="splash-phrase-carousel-item">open source</span>
                    <span className="splash-phrase-carousel-item">adjective</span>
                    <span className="splash-phrase-carousel-item">adjective</span>
                    <span className="splash-phrase-carousel-item">production</span>
                    <span className="splash-phrase-carousel-item">unbiased</span>
                </span>
                module bundler
            </div>
        )
    }

    componentDidMount() {
        let count = this.carousel.children.length,
            increment = 360 / count,
            angles = new Array(count)
                .fill(0)
                .map((zero, i) => (i * increment).toFixed(3))

        this.interval = setInterval(() => {
            // this.setState({
            //     rotation: angles[ Math.floor(Math.random() * angles.length) ]
            // })
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval( this.interval )
    }
}
