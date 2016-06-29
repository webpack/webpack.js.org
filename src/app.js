// Import Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Import Components
import Frame from 'Components/frame/frame'

// TODO: Import the following using the promise-loader
import Splash from 'Components/splash/splash'
import Guides from 'Components/guides/guides'
import Reference from 'Components/reference/reference'
import Contribute from 'Components/contribute/contribute'
import Analyze from 'Components/analyze/analyze'
import Donate from 'Components/donate/donate'
import Lost from 'Components/lost/lost'

// Load Base Styling
import 'Utilities/scss/reset'

// Create the site
ReactDOM.render((
	<Router history={ browserHistory }>
        <Route path="/" component={ Frame }>
            <IndexRoute component={ Splash } />
            <Route path="guides" component={ Guides } />
            <Route path="reference" component={ Reference } />
            <Route path="contribute" component={ Contribute } />
            <Route path="analyze" component={ Analyze } />
            <Route path="donate" component={ Donate } />
            <Route path="*" component={ Lost } />
        </Route>
    </Router>
), document.getElementById('root'))
