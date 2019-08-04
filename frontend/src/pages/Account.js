import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'

import { GETPAIRS } from '../graphql/queries/getPairs'
import { MEQUERY } from '../graphql/queries/me'
import AddFunds from '../components/AddFunds'

const Account = props => {
  const [open, setOpen] = useState(true),
        userData = useQuery(MEQUERY)
  
  return (
    <Query query={ GETPAIRS }>
    {({ data, loading, error }) => {
      if(loading) return <p>Loading...</p>
      if(!data) return <p>Nothing to show!</p>
      if(error) return <Redirect to='/login' />

      let count = 0
      data.getPairs.forEach(pair => {
        if(!pair.open) {
          count += pair.profitLoss
        } 
      })

      return (
        <main>
          <h2>{ userData.data && userData.data.me.name }</h2>
          <div>
            <p><span>Available Balance: </span>{ userData.data && userData.data.me.bankroll.toLocaleString() }.00</p>
            <p><span>Total P/L: </span>{ count }</p>
            <AddFunds />
          </div>
          <br />
          { props.location.state &&  (
            <div>
              <h3>New Position</h3>
              <div className='pair_divs'>
                <p><span>Pair: </span>{ props.location.state.data.openPosition.pair.pair }</p>
                <p><span>Lot Size: </span>{ props.location.state.data.openPosition.pair.lotSize.toLocaleString() }.00</p>
                <p><span>Pip Dif: </span>{ props.location.state.data.openPosition.pair.openedAt }</p>
                <p><span>Position: </span>{ props.location.state.data.openPosition.pair.position }</p>
              </div>
            </div>
          )}
          <br />
          <h3>Currency Pairs</h3>
          <button onClick={() => setOpen(true)}>open</button>
          <button onClick={() => setOpen(false)}>closed</button>
          <div>
          { data.getPairs && data.getPairs.map(pair => pair.open && open && (
            <div className='pair_divs' key={pair.id}>
              <Link to={{ pathname: '/pair', state: { pair, me: userData.data && userData.data.me } }}>
                { pair.pair && <p><span>Currency Pair: </span>{ pair.pair }</p> }
                { pair.lotSize && <p><span>Lot Size: </span>{ pair.lotSize.toLocaleString() }.00</p> }
                { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
                { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
                { pair.updatedAt && <p><span>Updated At: </span>{ new Date(+pair.updatedAt).toLocaleString() }</p> }
              </Link>
            </div>
          ))}
          { data.getPairs && data.getPairs.map(pair => !pair.open && !open && (
            <div className='pair_divs' key={ pair.id }>
              <div>
                { pair.pair && <p><span>Currency Pair: </span>{ pair.pair }</p> }
                { pair.lotSize && <p><span>Lot Size: </span>{ pair.lotSize.toLocaleString() }.00</p> }
                { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
                { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt.toFixed(4) }</p> }
                { <p><span>Pip Dif: </span>{ pair.pipDif || 0 }</p> }
                { <p><span>Profit/Loss: </span>{ pair.profitLoss.toFixed(2) || 0 }</p> }
                { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
                { pair.updatedAt && <p><span>Updated At: </span>{ new Date(+pair.updatedAt).toLocaleString() }</p> }
              </div>
            </div>
          ))}
          </div>
        </main>
      )
    }}
    </Query>
  )
}

export default Account