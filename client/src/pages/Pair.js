import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import ClosePosition from '../components/positions/ClosePosition'
import PairDetails from '../components/pairs/PairDetails'

export default function Pair(props) {
  const { createdAt, lotSize, openedAt, pair, position, id } = props.location.state.pair,
        { bankroll, name } = props.location.state.me,
        [ fc, tc ] = pair.split('/'),
        { data, loading, error, refetch } = useQuery(CURRENCY_PAIR_INFO, {
          variables: { fc, tc }
        })

  if(loading) return <p>Loading...</p>
  if(error) return <p>{ error.message }</p>
  
  const { bidPrice, lastRefreshed, askPrice } = data.currencyPairInfo,
        pipDifLong = (bidPrice - openedAt).toFixed(4),
        pipDifShort = (openedAt - askPrice).toFixed(4),
        potentialProfitLoss = position === 'long'
          ? pipDifLong * lotSize
          : pipDifShort * lotSize,
        date = new Date(lastRefreshed + ' UTC')
  
  return data && (
    <section>
      <div className='landing_pair_data'>
        <h3>Pair Details</h3>
        <div>
          <p>{ name } your available balance is { bankroll.toLocaleString() }.00</p> 
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
      </div>
    </section>
  )
}