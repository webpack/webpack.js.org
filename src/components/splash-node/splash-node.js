// Import Dependencies
import React from 'react'

// Load Styling
import './splash-node-style'

// Create the "SplashNode" component
let SplashNode = props => {
    let { type = 'js', size = 50 } = props

    return (
        <div className="splash-node" style={{ width: size + 'px', height: size + 'px' }}>
            <div className={ `splash-node-logo -${type || '.js'}` } />
        </div>
    )
}

// Export it
export default SplashNode
