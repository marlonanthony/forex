import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import ClosePosition from '../components/positions/ClosePosition'
import PairDetails from '../components/PairDetails'

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
                pipDifShort = (openedAt - askPrice).toFixed(4),
                potentialProfitLoss = (position === 'long'
                  ? pipDifLong * lotSize
                  : pipDifShort * lotSize),
                date = new Date(lastRefreshed + ' UTC')
          
          return  data && (
            <main>
              <h3>Pair Details</h3>
              <div>
                <p>{ name } your available balance: { bankroll.toLocaleString() }.00</p> 
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
              <PairDetails
                pair={pair} 
                lotSize={lotSize}
                openedAt={openedAt}
                position={position}
                createdAt={createdAt}
                askPrice={askPrice}
                bidPrice={bidPrice}
                lastRefreshed={date.toLocaleString()}
                pipDifLong={pipDifLong}
                pipDifShort={pipDifShort}
                potentialProfitLoss={potentialProfitLoss}
              />
            </main>
          )
        }}
      </Query>           
    )
  }
}

export default Pair 