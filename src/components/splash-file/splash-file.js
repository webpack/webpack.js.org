// Import Dependencies
import React from 'react'

// Load Styling
import './splash-file-style'

// Create the component
let SplashFile = props => {
    let { type = 'other' } = props
    
    return (
        <span className="splash-file">
            <i className={`splash-file-icon -${type}`} />
            { props.children }
        </span>
    )
}

// Export it
export default SplashFile