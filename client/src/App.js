import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Navbar from './components/navbar/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Account from './pages/Account'
import Pair from './pages/Pair'
import Chart from './pages/Chart'

const App = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/' render={() => (
      <main>
        <div className='navbar'><Navbar /></div>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/pair' component={Pair} />
        <Route path='/chart' component={Chart} />
      </main>
    )} />
  </Switch>
)

export default App