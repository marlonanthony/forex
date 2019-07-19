import React, { useState } from 'react'
import { Query } from 'react-apollo'

import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import SelectList from '../components/SelectList'

const Landing = () => {
  const [fc, setFc] = useState('EUR'),
        [tc, setTc] = useState('USD')
  
  return (
    <Query query={CURRENCY_PAIR_INFO} variables={{ fc, tc }}>
      {({ data, loading, error, refetch }) => {
        if(loading) return <div>Loading...</div>
        if(error) return <button onClick={() => refetch()}>Retry</button>
        return data && (
          <main>
            <h2>Currency Exchange</h2>
            <div>
              <SelectList fc={fc} tc={tc} setFc={setFc} setTc={setTc} />
              <button onClick={() => refetch()}>refresh</button>
            </div>
            {
              data.currencyPairInfo && Object.keys(data.currencyPairInfo).map(val => (
                <div key={val} className='data'>
                  <p><span>{val}: </span>{data.currencyPairInfo[val]}</p>
                </div>
              ))
            }
          </main>
        )
      }}
    </Query>
  )
}

export default Landing