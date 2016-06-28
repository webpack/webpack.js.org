// Import Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Import Components
import Frame from 'Components/frame/frame'

// Load Base Styling
import 'Utilities/scss/reset'

// Create the site
ReactDOM.render((
	<Router history={ browserHistory }>
        <Route path="/" component={ Frame }>
            
        </Route>
    </Router>
), document.getElementById('root'))
