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
    update={cache => {
      const user = cache.readQuery({ query: MEQUERY })
      user.me.bankroll -= 100000
      cache.writeQuery({
        query: MEQUERY,
        data: { me: user.me }
      })
    }}
  >
    {(openPosition, { data, loading, error }) => {
      if(loading) return <p>Loading...</p>
      if(error) return <p>{ error.message }</p>
      return openPosition && (
        <>
          <button onClick={ async () => {
            alert('Are you sure you want to buy?')
            await openPosition()
            setShowModal(true)
          }}>
            Buy
          </button>
          { data && data.openPosition.message && showModal && (
            <div className='modal'>
              <button onClick={() => setShowModal(false)}>x</button>
              <p>{ data.openPosition.message }</p>
              <p>Currency Pair: { data.openPosition.pair.pair }</p>
              <p>Lot Size: { data.openPosition.pair.lotSize.toLocaleString() }.00</p>
              <p>Opened At: { data.openPosition.pair.openedAt }</p>
              <p>Position: { data.openPosition.pair.position }</p>
              <Link to={{ pathname: '/account', state: { data } }}>
                <button>Details</button>
              </Link>
            </div>
          )}
        </>
      )
    }}
  </Mutation>
)

export default OpenLongPosition