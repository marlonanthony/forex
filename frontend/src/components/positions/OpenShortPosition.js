import React from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { OPENPOSITION } from '../../graphql/mutations/openPosition'
import { MEQUERY } from '../../graphql/queries/me'

const OpenShortPosition = ({
  fc,
  tc,
  bidPrice,
  showModal,
  setShowModal
}) => (
  <Mutation
    mutation={OPENPOSITION}
    variables={{ 
      pair: `${fc}/${tc}`, 
      lotSize: 100000, 
      openedAt: bidPrice, 
      position: 'short' 
    }}
    refetchQueries={[{ query: MEQUERY }]}>
    {(openPosition, { data, loading, error }) => {
      if(loading) return <div>Loading...</div>
      if(error) return <small>Error: { error.message }</small>
      return openPosition && (
        <>
          <button onClick={() => {
            alert('Are you sure you want to sell short?')
            setShowModal(true) 
            openPosition()
          }}>
            Sell
          </button> 
          { data && data.openPosition.message && showModal && ( 
            <div className='modal'>
              <button onClick={() => setShowModal(false)}>x</button>
              <p>{data && data.openPosition.message}!</p>
              <p>Currency Pair: {data.openPosition.pair.pair}</p>
              <p>Lot Size: {data.openPosition.pair.lotSize.toLocaleString() +'.00'}</p>
              <p>Opened At: {data.openPosition.pair.openedAt}</p>
              <p>Position: {data.openPosition.pair.position}</p>
              <Link to={{ pathname: '/account', state: { data } }}>
                <span>Details</span>
              </Link>
            </div>
          )}
        </>
      )
    }}
  </Mutation>
)

export default OpenShortPosition
