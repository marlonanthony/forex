import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { CLOSEPOSITION } from '../../graphql/mutations/closePosition'
import { MEQUERY } from '../../graphql/queries/me'
import { GETPAIRS } from '../../graphql/queries/getPairs'

import { useQuery } from 'react-apollo-hooks'

export default function ClosePosition({ id, bidPrice, askPrice, position }) {
  const [showModal, setShowModal] = useState(false)
  const { refetch  } = useQuery(MEQUERY) 

  return (
    <Mutation 
      mutation={CLOSEPOSITION} 
      variables={ position === 'long' 
        ? { id, closedAt: +bidPrice } 
        : { id, closedAt: +askPrice } }
      refetchQueries={[{ query: MEQUERY }, { query: GETPAIRS }]}
    >
      {(closePosition, { data, loading, error }) => {
        if(loading) return <p>Loading...</p>
        if(error) return <p>{ error.message }</p>
        return closePosition && (
          <>
            <button onClick={() => {
              alert(`Are you sure you want to close your ${
                position === 'long' ? 'long' : 'short' } position?`) 
              closePosition()
              refetch()
              setShowModal(true)
            }}>
              { position === 'long' ? 'Sell' : 'Buy' }
            </button> 
            { data && data.closePosition.message && showModal && ( 
              <div className='modal'>
                <button onClick={() => setShowModal(false)}>X</button>
                <p>{ data.closePosition.message }</p>
                <Link to='/account'><button>Account</button></Link>
              </div>
            )}
          </>
        )
      }}
    </Mutation> 
  )
}



// import React, { useState } from 'react'
// import { Mutation } from 'react-apollo'
// import { Link } from 'react-router-dom'

// import { useMutation } from 'react-apollo-hooks'

// import { CLOSEPOSITION } from '../../graphql/mutations/closePosition'
// import { MEQUERY } from '../../graphql/queries/me'
// import { GETPAIRS } from '../../graphql/queries/getPairs'

// export default function ClosePosition({ id, bidPrice, askPrice, position }) {
//   const [showModal, setShowModal] = useState(false),
//         [closePosition, { data, loading, error }] = useMutation(CLOSEPOSITION, {
//           variables:  position === 'long'
//             ? { id, closedAt: +bidPrice }
//             : { id, closedAt: +askPrice },
//           refetchQueries: [{ query: MEQUERY }, { query: GETPAIRS }]
//         })

//   if(loading) return <p>Loading...</p>
//   if(error) return <p>{ error.message }</p>

//   return (
//     <>
//       <button onClick={ async () => {
//         alert(`Are you sure you want to close your ${
//           position === 'long' ? 'long' : 'short' } position?`) 
//         await closePosition()
//         setShowModal(true)
//       }}>
//         { position === 'long' ? 'Sell' : 'Buy' }
//       </button> 
//       { data && data.closePosition.message && showModal && ( 
//         <div className='modal'>
//           <button onClick={() => setShowModal(false)}>X</button>
//           <p>{ data.closePosition.message }</p>
//           <Link to='/account'><button>Account</button></Link>
//         </div>
//       )}
//     </>
//   )
// }