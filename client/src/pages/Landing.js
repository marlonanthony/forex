import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { MEQUERY } from '../graphql/queries/me'
import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import SelectList from '../components/pairs/SelectList'
import OpenLongPosition from '../components/positions/OpenLongPosition'
import OpenShortPosition from '../components/positions/OpenShortPosition'

const Landing = () => {
  const [fc, setFc] = useState('EUR'),
        [tc, setTc] = useState('USD'),
        [askPrice, setAskPrice] = useState(0),
        [bidPrice, setBidPrice] = useState(0),
        [showModal, setShowModal] = useState(false),
        user = useQuery(MEQUERY),
        { data, loading, error, refetch } = useQuery(CURRENCY_PAIR_INFO, {
          variables: { fc, tc }
        })
  if(loading) return <p>Loading...</p>
  if(error) return <button onClick={() => refetch()}>Retry</button>
  
  return data && (
    <section>
      <h2>Currency Exchange</h2>
      { user.data.me && <p>Available Balance { user.data.me.bankroll.toLocaleString()}.00</p> }
      <div>
        <SelectList fc={fc} tc={tc} setFc={setFc} setTc={setTc} />
        <button onClick={() => refetch()}>Refresh</button>
        { user.data.me && (
          <OpenLongPosition
            fc={fc}
            tc={tc}
            pairData={data}
            askPrice={askPrice}
            setAskPrice={setAskPrice}
            showModal={showModal}
            setShowModal={setShowModal}
        />)}
        { user.data.me && (
          <OpenShortPosition
            fc={fc}
            tc={tc}
            pairData={data}
            bidPrice={bidPrice}
            setBidPrice={setBidPrice}
            showModal={showModal}
            setShowModal={setShowModal}
        />)}
      </div>
      <div className='landing_data'>
        { data.currencyPairInfo && Object.keys(data.currencyPairInfo).map(val => (
          <div key={val} className='data'>
            <p><span>{val}: </span>{ data.currencyPairInfo[val] }</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Landing