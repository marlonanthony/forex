import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Navbar from './components/navbar/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Account from './pages/Account'
import Pair from './pages/Pair'

const App = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/' render={() => (
      <>
        <div className='navbar'><Navbar /></div>
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/pair' component={Pair} />
        <Route exact path='/' component={Landing} />
      </>
    )} />
  </Switch>
)

export default App