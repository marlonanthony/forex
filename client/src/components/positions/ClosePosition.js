import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { CLOSEPOSITION } from '../../graphql/mutations/closePosition'
import { MEQUERY } from '../../graphql/queries/me'
import { GETPAIRS } from '../../graphql/queries/getPairs'

export default function ClosePosition({ id, bidPrice, askPrice, position }) {
  const [showModal, setShowModal] = useState(false),
        { refetch  } = useQuery(MEQUERY),
        [ closePosition, { data, loading, error }] = useMutation(CLOSEPOSITION, {
          variables: position === 'long'
            ? { id, closedAt: +bidPrice } 
            : { id, closedAt: +askPrice },
          refetchQueries: [{ query: GETPAIRS }]
        })

  if(loading) return <p>Loading...</p>
  if(error) return <p>{ error.message }</p>
  return closePosition && (
    <>
      <button onClick={ async () => {
        alert(`Are you sure you want to close your ${
          position === 'long' ? 'long' : 'short' } position?`) 
        await closePosition()
        setShowModal(true)
        refetch()
      }}>
        { position === 'long' ? 'Sell' : 'Buy' }
      </button> 
      
      { data && data.closePosition.message && showModal && ( 
        <div className='modal'>
          <button onClick={() => setShowModal(false)}>x</button>
          <p>{ data.closePosition.message }</p>
          <Link to='/account'><button>Account</button></Link>
        </div>
      )}
    </>
  )
}