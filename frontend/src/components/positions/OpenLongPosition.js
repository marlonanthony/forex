import React from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { OPENPOSITION } from '../../graphql/mutations/openPosition'
import { MEQUERY } from '../../graphql/queries/me'

const OpenLongPosition = ({
  fc, 
  tc, 
  askPrice,
  showModal,
  setShowModal
}) => (
  <Mutation
    mutation={OPENPOSITION}
    variables={{
      pair: `${fc}/${tc}`,
      lotSize: 100000,
      openedAt: askPrice,
      position: 'long'
    }}
    refetchQueries={[{ query: MEQUERY }]}
  >
    {(openPosition, { data, loading, error }) => {
      if(loading) return <div>Loading...</div>
      if(error) return <p>Error: { error.message }</p>
      return openPosition && (
        <>
          <button onClick={() => {
            alert('Are you sure you want to buy?')
            openPosition()
            setShowModal(true)
          }}>
            Buy
          </button>
          { data && data.openPosition.message && showModal && (
            <div className='modal'>
              <button onClick={() => setShowModal(false)}>x</button>
              <p>{data.openPosition.message}!</p>
              <p>Currency Pair: {data.openPosition.pair.pair}</p>
              <p>Lot Size: {data.openPosition.pair.lotSize.toLocaleString() +'.00'}</p>
              <p>Opened At: {data.openPosition.pair.openedAt}</p>
              <p>Position: {data.openPosition.pair.position}</p>
              <Link to={{ pathname: '/account', state: { data } }}><span>Details</span></Link>
            </div>
          )}
        </>
      )
    }}
  </Mutation>
)

export default OpenLongPosition