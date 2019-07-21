import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'

import { MEQUERY } from '../../graphql/queries/me'
import Logout from '../auth/Logout'
import './Navbar.css'

const Navbar = () => (
  <div className='navigation'>
    <header><NavLink exact to='/'>Currency Exchange</NavLink></header>
    <Query query={MEQUERY}>
      {({ data, loading, error }) => {
        if(loading) return <p>Loading....</p>
        if(error) return <Redirect to='/login' />
        if(!data) return <p>This is unfortunate</p>
        if(!data.me) return (
          <ul>
            <li><NavLink exact to='/login'>Login</NavLink></li>
            <li><NavLink exact to='register'>SignUp</NavLink></li>
          </ul>
        ) 
        return (
          <ul>
            <li><Logout /></li>
          </ul>
        )
      }}
    </Query>
  </div>
)

export default Navbar