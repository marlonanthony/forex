import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Navbar from './components/navbar/Navbar'

const App = () => (
  <>
    <div className='navbar'><Navbar /></div>
    <Switch>
      <Route exact path='/' component={Landing} />
    </Switch>
  </>
)

export default App