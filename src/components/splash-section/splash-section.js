// Import Dependencies
import React from 'react'

// Import Components
import Container from 'Components/container/container'

// Load Styling
import './splash-section-style'

// Create the "SplashSection" component
let SplashSection = props => {
    return (
        <section className={`splash-section -${props.theme || 'light'}`}>
            <Container className="splash-section-content">
                { props.children }
            </Container>
        </section>
    )
}

// Export it
export default SplashSection
