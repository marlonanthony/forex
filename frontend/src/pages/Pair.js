import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'

import { CLOSEPOSITION } from '../graphql/mutations/closePosition'
import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import { MEQUERY } from '../graphql/queries/me'

const Pair = props => {
  const [showModal, setShowModal] = useState(false)

  if(!props.location.state) return <Redirect to='/login' />
  else {
    const {createdAt, lotSize, openedAt, pair, position, id } = props.location.state.pair,
          { bankroll, name } = props.location.state.me,
          [fc, tc] = pair.split('/')

    return (
      <Query query={CURRENCY_PAIR_INFO} variables={{ fc, tc }}>
        {({ data, loading, error, refetch }) => {
          if(loading) return <div>Loading...</div>
          if(error) return <p>{ error.message }</p>
          const { bidPrice, lastRefreshed, askPrice } = data.currencyPairInfo,
                pipDifLong = (bidPrice - openedAt).toFixed(4),
                potentialProfitLossLong = pipDifLong * lotSize,
                pipDifShort = (openedAt - askPrice).toFixed(4),
                potentialProfitLossShort = pipDifShort * lotSize
          
          return  data && (
            <main>
              <h3>Pair Details</h3>
              <div>
                <p>{ name } your available balance: { bankroll.toLocaleString() +'.00' }</p> 
                <div>
                  <button onClick={() => refetch()}>Refresh</button>
                  <Mutation 
                    mutation={CLOSEPOSITION} 
                    variables={ position === 'long' 
                      ? { id, closedAt: +bidPrice } 
                      : { id, closedAt: +askPrice } }
                    refetchQueries={[{ query: MEQUERY }]}
                  >
                    {(closePosition, { data, loading, error }) => {
                      if(loading) return <div>Loading...</div>
                      if(error) return <p>{ error.message }</p>
                      return closePosition && (
                        <>
                          <button onClick={() => {
                            position == 'long' 
                            ? alert('Are you sure you want to sell your long position?') 
                            : alert('Are you sure you want to close your short position?')
                            closePosition()
                            setShowModal(true) 
                          }}>
                            { position === 'long' ? 'Sell' : 'Buy' }
                          </button> 
                          { data && data.closePosition.message && showModal && ( 
                            <div className='open_position_modal'>
                              <button onClick={() => setShowModal(false)}>X</button>
                              <p>{data && data.closePosition.message}!</p>
                              <Link to='/account'><span>Account</span></Link>
                            </div>
                          )}
                        </>
                      )
                    }}
                  </Mutation> 
                </div>
              </div>
              <div>
                <p><span>Currency Pair: </span>{pair}</p>
                <p><span>Lot Size: </span>{lotSize.toLocaleString()+'.00'}</p>
                <p><span>Opened At: </span>{openedAt}</p>
                <p><span>Position: </span>{position}</p>
                <p><span>Created At: </span>{new Date(+createdAt).toLocaleString()}</p>
                { position === 'long' 
                  ? (
                    <>
                      <br />
                      <p><span>Current Bid Price: </span>{bidPrice}</p>
                      <p><span>Last Refreshed: </span>{lastRefreshed}</p>
                      <p><span>Current Pip Difference: </span>{pipDifLong}</p>
                      <p><span>Potential PL: </span>
                        {potentialProfitLossLong.toLocaleString()+'.00'}
                      </p>
                    </>
                  ) : (
                    <>
                      <br />
                      <p><span>Current Ask Price: </span>{+askPrice}</p>
                      <p><span>Last Refreshed: </span>{lastRefreshed}</p>
                      <p><span>Current Pip Difference: </span>{pipDifShort}</p>
                      <p><span>Potential PL: </span>
                        {potentialProfitLossShort.toLocaleString()+'.00'}
                      </p>
                    </>
                  )
                }
              </div>
            </main>
          )
        }}
      </Query>           
    )
  }
}

export default Pair 