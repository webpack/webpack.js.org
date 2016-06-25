// Import Dependencies
import React from 'react'

// Import Components
import Icon from 'Components/icon/icon'

// Load Styling
import './logo-style'

// Create the "Logo" component
let Logo = props => {
	return (
		<a className="logo">
			<Icon theme="light" depth={ 20 } />
			<span className={ `logo-text -${ props.theme || 'dark' }`}>Webpack</span>
		</a>
	)
}

// Export it
export default Logo
