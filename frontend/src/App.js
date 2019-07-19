import React from 'react'
import { Route } from 'react-router-dom'

import Landing from './pages/Landing'

const App = () => <Route exact path='/' component={Landing} />

export default App