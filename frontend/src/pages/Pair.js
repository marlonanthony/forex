import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import ClosePosition from '../components/positions/ClosePosition'

const Pair = props => {
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
                  <ClosePosition 
                    id={id} 
                    bidPrice={bidPrice} 
                    askPrice={askPrice} 
                    position={position} 
                  />
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
                    </> ) 
                  : (
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