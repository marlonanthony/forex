import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Navbar from './components/navbar/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => (
  <>
    <div className='navbar'><Navbar /></div>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
    </Switch>
  </>
)

export default App