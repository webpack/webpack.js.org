// Import Dependencies
import React, { Component } from 'react'

// Import Components
import SplashHeader from 'Components/splash-header/splash-header'

// Load Styling
import './splash-style'

// Export the "Splash" component
export default class Splash extends Component {
    render() {
        return (
            <main className="splash">
                <SplashHeader />
                
            </main>
        )
    }
}