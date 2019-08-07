import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'

import { GETPAIRS } from '../graphql/queries/getPairs'
import { MEQUERY } from '../graphql/queries/me'
import AddFunds from '../components/pairs/AddFunds'
import Pairs from '../components/pairs/Pairs'
import NewPosition from '../components/pairs/NewPosition'

export default function Account(props) {
  const [open, setOpen] = useState(true),
        user = useQuery(MEQUERY),
        { data, loading, error } = useQuery(GETPAIRS)

  if(user.error) return <Redirect to='/login' />
  if(!user.data || !user.data.me) return <p>A man has no name.</p>
  if(loading) return <p>Loading...</p>
  if(!data) return (
    <section>
      <h2>{ user.data.me.name }</h2>
      <div>
        <p><span>Available Balance: </span>{ user.data.me.bankroll.toLocaleString() }.00</p>
        <AddFunds />
      </div>
    </section>
  )
  if(error) return <p>{ error.message }</p>
  
  return (
    <section>
      <h2>{ user.data.me.name }</h2>
      <div>
        <p><span>Available Balance: </span>{ user.data.me.bankroll.toLocaleString() }.00</p>
        <AddFunds />
      </div>
      { props.location.state && <NewPosition state={ props.location.state } /> }
      <h3>Currency Pairs</h3>
      <button onClick={() => setOpen(true)}>open</button>
      <button onClick={() => setOpen(false)}>closed</button>
      <Pairs data={ data } open={ open } user={ user } />
    </section>
  )
}