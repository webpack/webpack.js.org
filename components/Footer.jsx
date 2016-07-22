import React from 'react';
import { Link } from 'react-router';

import Icon from './Icon';
import Container from './Container';

export default props => {
    return (
        <footer className="footer">
            <Container className="footer-inner">
                <section className="footer-inner-left">
                    <Link className="footer-inner-link" to="get-started">Get Started</Link>
                    <Link className="footer-inner-link" to="analyze">Analyze</Link>
                    <Link className="footer-inner-link" to="contribute">Contribute</Link>
                </section>

                <section className="footer-inner-middle">
                    <Link to={{ pathname: '/' }}>
                        <Icon depth={ 18 } hover />
                    </Link>
                </section>

                <section className="footer-inner-right">
                    <Link className="footer-inner-link" to="changelog">Changelog</Link>
                    <Link className="footer-inner-link" to="license">License</Link>
                </section>
            </Container>
        </footer>
    )
}
