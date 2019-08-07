import React, { useState } from 'react'
import { useMutation } from 'react-apollo'

import { ADDFUNDS } from '../../graphql/mutations/addFunds'

export default function AddFunds() {
  const [showModal, setShowModal] = useState(false),
        [addFunds, { data, loading, error }] = useMutation(ADDFUNDS, {
          variables: { amount: 1000000 }
        })

  if(loading) return <p>Loading...</p>
  if(error) return <p>{ error.message }</p>

  return addFunds && (
    <>
      <button onClick={ async () => {
        alert('Are you sure?')
        await addFunds()
        setShowModal(true) 
      }}>Add Funds</button>
      { data && data.addFunds.message && showModal && ( 
        <div className='modal'>
          <button onClick={() => setShowModal(false)}>x</button>
          <p>{ data.addFunds.message }</p>
        </div>
      )}
    </>
  )
}