import React from 'react'

const PairDetails = ({
  pair,
  lotSize,
  openedAt,
  position,
  createdAt,
  askPrice,
  bidPrice,
  lastRefreshed,
  pipDifLong,
  pipDifShort,
  potentialProfitLossLong,
  potentialProfitLossShort
}) => (
  <div>
    <p><span>Currency Pair: </span>{pair}</p>
    <p><span>Lot Size: </span>{lotSize.toLocaleString()}.00</p>
    <p><span>Opened At: </span>{(+openedAt).toFixed(4)}</p>
    <p><span>Position: </span>{position}</p>
    <p><span>Created At: </span>{new Date(+createdAt).toLocaleString()}</p>
    { position === 'long' 
      ? (
        <>
          <br />
          <p><span>Current Bid Price: </span>{(+bidPrice).toFixed(4)}</p>
          <p><span>Last Refreshed: </span>{lastRefreshed}</p>
          <p><span>Current Pip Difference: </span>{pipDifLong}</p>
          <p><span>Potential PL: </span>
            {potentialProfitLossLong.toLocaleString()}.00
          </p>
        </> ) 
      : (
        <>
          <br />
          <p><span>Current Ask Price: </span>{(+askPrice).toFixed(4)}</p>
          <p><span>Last Refreshed: </span>{lastRefreshed}</p>
          <p><span>Current Pip Difference: </span>{pipDifShort}</p>
          <p><span>Potential PL: </span>
            {potentialProfitLossShort.toLocaleString()}.00
          </p>
        </>
      )
    }
  </div>
)

export default PairDetails