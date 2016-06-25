// Import Dependencies
import React from 'react'

// Import Components
import Container from 'Components/container/container'
import Logo from 'Components/logo/logo'

// Load Styling
import './banner-style'

// Create the Banner component
let Banner = props => {
	return (
		<header className="banner">
			<Container className="banner-inner">
				<Logo theme="light" />
			</Container>
		</header>
	)
}

// Export it
export default Banner
