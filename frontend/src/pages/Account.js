import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'

import { MEQUERY } from '../graphql/queries/me'
import AddFunds from '../components/AddFunds'

const Account = props => {
  const [open, setOpen] = useState(true)
  
  return (
    <Query query={MEQUERY}>
    {({ data, loading, error }) => {
      if(loading) return <div>Loading...</div>
      if(error) return <Redirect to='/login' />
      if(!data) return <div>Poor sap!</div>
      if(!data.me) return <Redirect to='/login' />

      let count = 0
      data.me.pairs.forEach(pair => {
        if(!pair.open && pair.profitLoss) {
          count += pair.profitLoss
        } 
      })

      return (
        <main>
          <h2>{data.me.name}</h2>
          <div>
            <p><span>Available Balance: </span>{ data.me.bankroll.toLocaleString() +'.00' }</p> 
            <p><span>Total P/L: </span>{count}</p>
            <AddFunds />
        </div>
        <br />
        { props.location.state &&  (
          <div>
            <h3>New Position</h3>
            <div className='pair_divs'>
              <p><span>Pair: </span>{props.location.state.data.openPosition.pair.pair}</p>
              <p><span>Lot Size: </span>{props.location.state.data.openPosition.pair.lotSize.toLocaleString() +'.00'}</p>
              <p><span>Pip Dif: </span>{props.location.state.data.openPosition.pair.openedAt}</p>
              <p><span>Position: </span>{props.location.state.data.openPosition.pair.position}</p>
            </div>
          </div>
        )}
        <br />
        <h3>Currency Pairs</h3>
        <button onClick={() => setOpen(true)}>open</button>
        <button onClick={() => setOpen(false)}>closed</button>
        <div>
          { data.me.pairs && data.me.pairs.map(pair => pair.open && open && (
            <div className='pair_divs' key={pair.id}>
              <Link to={{ pathname: '/pair', state: { pair, me: data.me } }}>
                { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
                { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
                { pair.updatedAt && <p><span>Updated At: </span>{ new Date(+pair.updatedAt).toLocaleString() }</p> }
              </Link>
            </div>
          ))}
          { data.me.pairs && data.me.pairs.map(pair => !pair.open && !open && (
            <div className='pair_divs' key={pair.id}>
              <div>
                { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
                { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt.toFixed(4) }</p> }
                { pair.pipDif && <p><span>Pip Dif: </span>{ pair.pipDif }</p> }
                { pair.profitLoss && <p><span>Profit/Loss: </span>{ pair.profitLoss.toFixed(2) }</p> }
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