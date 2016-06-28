// Import Dependencies
import React from 'react'

// Load Styling
import './container-style'

// Create the "Container" component
let Container = props => {
    return (
        <div className={ `container ${props.className || ''}`}>
            { props.children }
        </div>
    )
}

// Export it
export default Container
