// Import Dependencies
import React from 'react'

// Import Components
import { Link } from 'react-router'
import Container from 'Components/container/container'
import Logo from 'Components/logo/logo'

// Load Styling
import './banner-style'

// Create the Banner component
let Banner = props => {
    return (
        <header className="banner">
            <Container className="banner-inner">
                <Logo theme="light" />

                <nav className="banner-nav">
                    <Link className="banner-nav-link" activeClassName="-active" to={{ pathname: '/guides' }}>Guides</Link>
                    <Link className="banner-nav-link" activeClassName="-active" to={{ pathname: '/reference' }}>Reference</Link>
                    <Link className="banner-nav-link" activeClassName="-active" to={{ pathname: '/contribute' }}>Contribute</Link>
                    <Link className="banner-nav-link" activeClassName="-active" to={{ pathname: '/analyze' }}>Analyze</Link>
                    <Link className="banner-nav-link" activeClassName="-active" to={{ pathname: '/donate' }}>Donate</Link>
                </nav>
            </Container>
        </header>
    )
}

// Export it
export default Banner
