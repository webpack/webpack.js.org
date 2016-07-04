// Import Dependencies
import React, { Component } from 'react'
import Hljs from 'highlight.js'

// Import Content
// TODO: quick-start.md should be moved to src/content
import Content from './quick-start'

// Load Styling
import 'highlight.js/styles/tomorrow-night-eighties'
import './splash-intro-style'

console.debug(Hljs)
Hljs.initHighlightingOnLoad()

// Export the "SplashIntro" component
export default class SplashIntro extends Component {
    render() {
        return (
            <div className="splash-intro" dangerouslySetInnerHTML={{ __html: Content }} />
        )
    }
}