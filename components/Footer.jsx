// Import Dependencies
import React from 'react'

// Import Components
import { Link } from 'react-router'
import Icon from './Icon'
import Container from './Container'

// Create the "Footer" component
let Footer = props => {
    return (
        <footer className="footer">
            <Container className="footer-inner">
                <section className="footer-inner-left">
                    <Link className="footer-inner-link" to={{ pathname: '/license' }}>License</Link>
                    <a className="footer-inner-link" href="https://github.com/webpack/webpack/graphs/contributors">Contributors</a>
                    <a className="footer-inner-link" href="https://github.com/webpack/webpack/issues">Issues</a>
                </section>

                <section className="footer-inner-middle">
                    <Link to={{ pathname: '/' }}>
                        <Icon depth={ 18 } hover />
                    </Link>
                </section>

                <section className="footer-inner-right">
                    <Link className="footer-inner-link" to={{ pathname: '/about' }}>About</Link>
                    <Link className="footer-inner-link" to={{ pathname: '/resources' }}>Resources</Link>
                    <Link className="footer-inner-link" to={{ pathname: '/donate' }}>Donate</Link>
                </section>
            </Container>
        </footer>
    )
}

// Export it
export default Footer
