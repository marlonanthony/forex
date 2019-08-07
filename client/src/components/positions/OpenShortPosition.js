import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-apollo'

import { OPENPOSITION } from '../../graphql/mutations/openPosition'
import { MEQUERY } from '../../graphql/queries/me'
import { GETPAIRS } from '../../graphql/queries/getPairs'

const OpenShortPosition = ({
  fc,
  tc,
  pairData,
  bidPrice,
  setBidPrice,
  showModal,
  setShowModal
}) => {
  const [ openPosition, { data, loading, error }] = useMutation(OPENPOSITION, {
    variables: {
      pair: `${fc}/${tc}`, 
      lotSize: 100000, 
      openedAt: bidPrice, 
      position: 'short' 
    },
    update: cache => {
      const user = cache.readQuery({ query: MEQUERY })
      user.me.bankroll -= 100000
      cache.writeQuery({
        query: MEQUERY,
        data: { me: user.me }
      })
    },
    refetchQueries: [{ query: GETPAIRS }]
  })

  if(loading) return <p>Loading...</p>
  if(error) return <p>{ error.message }</p>
  return openPosition && (
    <>
      <button onClick={ async () => {
        await setBidPrice(+pairData.currencyPairInfo.bidPrice)
        alert('Are you sure you want to sell short?')
        await openPosition()
        setShowModal(true) 
      }}>
        Sell
      </button> 
      { data && data.openPosition.message && showModal && ( 
        <div className='modal'>
          <button onClick={() => setShowModal(false)}>x</button>
          <p>{ data && data.openPosition.message }</p>
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
}

export default OpenShortPosition