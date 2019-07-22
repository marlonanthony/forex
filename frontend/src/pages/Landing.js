import React, { useState } from 'react'
import { Query } from 'react-apollo'

import { MEQUERY } from '../graphql/queries/me'
import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import SelectList from '../components/SelectList'
import OpenLongPosition from '../components/positions/OpenLongPosition'

const Landing = () => {
  const [fc, setFc] = useState('EUR'),
        [tc, setTc] = useState('USD'),
        [askPrice, setAskPrice] = useState(0),
        [bidPrice, setBidPrice] = useState(0),
        [showModal, setShowModal] = useState(false)
  
  return (
    <Query query={CURRENCY_PAIR_INFO} variables={{ fc, tc }}>
      {({ data, loading, error, refetch, client }) => {
        if(loading) return <div>Loading...</div>
        if(error) return <button onClick={() => refetch()}>Retry</button>
        if(data) { 
          const user = client.readQuery({ query: MEQUERY })

          return (
            <main>
              <h2>Currency Exchange</h2>
              { user.me && <p>Available Balance { user.me.bankroll.toLocaleString() + '.00'}</p> }
              <div>
                <SelectList fc={fc} tc={tc} setFc={setFc} setTc={setTc} />
                <button onClick={() => refetch()}>Refresh</button>
                { setAskPrice(+data.currencyPairInfo.askPrice) }
                { setBidPrice(+data.currencyPairInfo.bidPrice) }
                { user.me && (
                  <OpenLongPosition
                    fc={fc}
                    tc={tc}
                    askPrice={askPrice}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />)}
                <button>Sell</button>
              </div>
              { data.currencyPairInfo && Object.keys(data.currencyPairInfo).map(val => (
                <div key={val} className='data'>
                  <p><span>{val}: </span>{data.currencyPairInfo[val]}</p>
                </div>
              ))}
            </main>
          )
        }
      }}
    </Query>
  )
}

export default Landing