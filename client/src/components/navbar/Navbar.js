import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'

import { MEQUERY } from '../../graphql/queries/me'
import Logout from '../auth/Logout'
import './Navbar.css'

const Navbar = () => {
  const { data, loading, error } = useQuery(MEQUERY)
  
  if(loading) return <p>Loading....</p>
  if(error) return <Redirect to='/login' />
  if(!data) return <p>This is unfortunate</p>

  return (
    <div className='navigation'>
      <header><NavLink exact to='/'>Forex</NavLink></header>
      { !data.me ? (
        <ul>
          <li><NavLink exact to='/login'>Login</NavLink></li>
          <li><NavLink exact to='/register'>SignUp</NavLink></li>
        </ul> ) 
      : (
        <ul>
          <li><NavLink to='/chart'>Chart</NavLink></li>
          <li><NavLink to='/account'>Account</NavLink></li>
          <li><Logout /></li>
        </ul>
      )}
    </div>
  )
}

export default Navbar