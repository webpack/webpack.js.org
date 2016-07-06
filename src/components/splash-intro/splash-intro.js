// Import Dependencies
import React, { Component } from 'react'
import Hljs from 'highlight.js'

// Import Content
// TODO: quick-start.md should be moved to src/content
import Content from './quick-start'

// Load Styling
import 'highlight.js/styles/tomorrow-night-eighties'
import './splash-intro-style'

// Export the "SplashIntro" component
export default class SplashIntro extends Component {
    render() {
        return (
            <div ref={ ref => this.container = ref }
                className="splash-intro" 
                dangerouslySetInnerHTML={{ __html: Content }} />
        )
    }

    componentDidMount() {
        let elements = this.container.getElementsByTagName('code')

        Array.from(elements).forEach(item => {
            Hljs.highlightBlock(item)
        })
    }
}