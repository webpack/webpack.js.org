// Import Dependencies
import React, { Component } from 'react'

// Import Components
import Banner from 'Components/banner/banner'
import Footer from 'Components/footer/footer'

// Load Styling
import './frame-style'

// Export the "Frame" component
export default props => {
    let splash = props.location.pathname === '/'

    return (
        <div className="frame">
            <Banner theme={ splash ? 'light' : 'dark' } absolute={ splash } />
            { props.children }
            <Footer />
        </div>
    )
}