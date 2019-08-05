import React from 'react'

export default function NewPositionDisplay({ state }) {
  return (
    <div>
      <h3>New Position</h3>
      <div className='pair_divs' style={{ textAlign: 'center' }}>
        <p><span>Pair: </span>{ state.data.openPosition.pair.pair }</p>
        <p><span>Lot Size: </span>{ state.data.openPosition.pair.lotSize.toLocaleString() }.00</p>
        <p><span>Pip Dif: </span>{ state.data.openPosition.pair.openedAt }</p>
        <p><span>Position: </span>{ state.data.openPosition.pair.position }</p>
      </div>
    </div>
  )
}
