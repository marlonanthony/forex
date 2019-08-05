import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'

import { GETPAIRS } from '../graphql/queries/getPairs'
import { MEQUERY } from '../graphql/queries/me'
import AddFunds from '../components/pairs/AddFunds'
import OpenClosedPairs from '../components/pairs/OpenClosedPairs'
import NewPositionDisplay from '../components/pairs/NewPositionDisplay'

const Account = props => {
  const [open, setOpen] = useState(true),
        user = useQuery(MEQUERY)

  if(user.loading) return <p>Loading...</p>
  if(user.error) return <Redirect to='/login' />
  if(!user.data || !user.data.me) return <p>get good</p>

  return (
    <Query query={ GETPAIRS }>
    {({ data, loading, error }) => {
      if(loading) return <p>Loading...</p>
      if(error) return <Redirect to='/login' />
      if(!data) return <p>could've gone better</p>

      let count = 0
      data.getPairs.forEach(pair => {
        if(!pair.open) {
          count += pair.profitLoss
        } 
      })

      return (
        <main>
          <h2>{ user.data.me.name }</h2>
          <div>
            <p><span>Available Balance: </span>{ user.data.me.bankroll.toLocaleString() }.00</p>
            <p><span>Total P/L: </span>{ count }</p>
            <AddFunds />
          </div>
          <br />
          { props.location.state && <NewPositionDisplay state={ props.location.state } /> }
          <br />
          <h3>Currency Pairs</h3>
          <button onClick={() => setOpen(true)}>open</button>
          <button onClick={() => setOpen(false)}>closed</button>
          <OpenClosedPairs data={ data } open={ open } user={ user } />
        </main>
      )
    }}
    </Query>
  )
}

export default Account