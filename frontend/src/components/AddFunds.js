import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import { ADDFUNDS } from '../graphql/mutations/addFunds'
import { MEQUERY } from '../graphql/queries/me';

const AddFunds = () => {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <Mutation 
      mutation={ADDFUNDS} 
      variables={{amount: 1000000}}
      refetchQueries={[{ query: MEQUERY }]}
    >
      {(addFunds, { data, loading, error }) => {
        if(loading) return <div>Loading...</div>
        if(error) return <p>Error: { error.message }</p>
        return addFunds && (
          <>
            <button onClick={() => {
              alert('Are you sure?')
              addFunds()
              setShowModal(true) 
            }}>Add Funds</button> 
            { data && data.addFunds.message && showModal && ( 
              <div className='modal'>
                <button onClick={() => setShowModal(false)}>x</button>
                <p>{data.addFunds.message}!</p>
              </div>
            )}
          </>
        )
      }}
    </Mutation>
  )
}

export default AddFunds