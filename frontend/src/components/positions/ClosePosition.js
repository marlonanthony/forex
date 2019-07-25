import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { CLOSEPOSITION } from '../../graphql/mutations/closePosition'
import { MEQUERY } from '../../graphql/queries/me'

export default function ClosePosition({ id, bidPrice, askPrice, position }) {
  const [showModal, setShowModal] = useState(false)

  return (
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
              position === 'long' 
                ? alert('Are you sure you want to sell your long position?') 
                : alert('Are you sure you want to close your short position?')
              closePosition()
              setShowModal(true)
            }}>
              { position === 'long' ? 'Sell' : 'Buy' }
            </button> 
            { data && data.closePosition.message && showModal && ( 
              <div className='modal'>
                <button onClick={() => setShowModal(false)}>X</button>
                <p>{data && data.closePosition.message}!</p>
                <Link to='/account'><span>Account</span></Link>
              </div>
            )}
          </>
        )
      }}
    </Mutation> 
  )
}