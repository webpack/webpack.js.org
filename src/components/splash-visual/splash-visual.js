// Import Dependencies
import React, { Component } from 'react'

// Import Components
import SplashNode from 'Components/splash-node/splash-node'
import SplashFile from 'Components/splash-file/splash-file'

// Load Styling
import './splash-visual-style'

// Export the "SplashVisual" component
export default class SplashVisual extends Component {
    render() {
        return (
            <div className="splash-visual">
                <section className="splash-visual-modules">
                    <div className="splash-visual-modules-column">
                        <SplashNode />
                        <SplashNode type="css" />
                        <SplashNode type="jade" />
                        <SplashNode type="coffee" />
                        <SplashNode type="css" />
                    </div>
                    <div className="splash-visual-modules-column">
                        <SplashNode type="img" />
                        <SplashNode type="less" />
                        <SplashNode type="less" />
                        <SplashNode />
                    </div>
                    <div className="splash-visual-modules-column">
                        <SplashNode type="less" />
                        <SplashNode type="css" />
                        <SplashNode type="jade" />
                    </div>
                    <div className="splash-visual-modules-column">
                        <SplashNode />
                        <SplashNode type="coffee" />
                    </div>
                </section>

                <section className="splash-visual-transformation" />

                <section className="splash-visual-output">
                    <div className="splash-visual-output-files">
                        <SplashFile type="html">index.html</SplashFile>
                        <SplashFile type="ico">favicon.ico</SplashFile>
                        <SplashFile type="css">style.bundle.css</SplashFile>
                        <SplashFile>style.bundle.css.map</SplashFile>
                        <SplashFile type="js">index.bundle.js</SplashFile>
                        <SplashFile>index.bundle.js.map</SplashFile>
                    </div>
                </section>
            </div>
        )
    }
}
