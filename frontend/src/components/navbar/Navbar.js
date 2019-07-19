import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => (
  <div className='navigation'>
    <header><NavLink exact to='/'>Currency Exchange</NavLink></header>
    <ul>
      <li><NavLink exact to="/login">Login</NavLink></li>
      <li><NavLink exact to='/register'>Sign Up</NavLink></li>
      <li>Logout</li>
    </ul>
  </div>
)

export default Navbar