// Import Dependencies
import React, { Component } from 'react'

// Import Components
import SplashHeader from 'Components/splash-header/splash-header'
import SplashSection from 'Components/splash-section/splash-section'
import SplashPhrase from 'Components/splash-phrase/splash-phrase'
import SplashVisual from 'Components/splash-visual/splash-visual'
import SplashIntro from 'Components/splash-intro/splash-intro'

// Load Styling
import './splash-style'

// Export the "Splash" component
export default class Splash extends Component {
    render() {
        return (
            <main className="splash">
                <SplashHeader />

                <SplashSection theme="dark">
                    <SplashPhrase />
                </SplashSection>

                <SplashSection theme="grey">
                    <SplashVisual />
                </SplashSection>

                <SplashSection>
                    <SplashIntro />
                </SplashSection>
            </main>
        )
    }
}