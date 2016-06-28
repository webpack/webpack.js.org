// Import Dependencies
import React, { Component } from 'react'

// Import Components
import Banner from 'Components/banner/banner'
import Footer from 'Components/footer/footer'

// Load Styling
import './frame-style'

// Export the "Frame" component
export default props => {
    return (
        <div className="frame">
            <Banner />
            { props.children }
            <Footer />
        </div>
    )
}