import React from 'react'
import { Mutation } from 'react-apollo'

import { ADDFUNDS } from '../graphql/mutations/addFunds'
import { MEQUERY } from '../graphql/queries/me';

const AddFunds = () => (
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
          }}>Add Funds</button> 
          { data && data.addFunds.message && ( 
            <div className='open_position_modal'>
              <p>{data.addFunds.messege}!</p>
            </div>
          )}
        </>
      )
    }}
  </Mutation>
)

export default AddFunds