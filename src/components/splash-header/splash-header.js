// Import Dependencies
import React, { Component } from 'react'

// Load Styling
import './splash-header-style'

// Export the "SplashHeader" component
export default class SplashHeader extends Component {
    render() {
        return (
            <section className="splash-header">
                <ul className="splash-header-squares">
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                    <li className="splash-header-square"></li>
                </ul>

                <div className="splash-header-content">
                    <div>
                        <span className="splash-header-content-title">Webpack</span>
                        <span className="splash-header-content-subtitle">Module Bundler</span>
                    </div>
                </div>
            </section>
        )
    }
}