import React from 'react'
import { Link } from 'react-router-dom'

export default function OpenClosedPairs({ data, open, user }) {
  return (
    <div>
      { data.getPairs && data.getPairs.map(pair => pair.open && open && (
        <div className='pair_divs' key={ pair.id }>
          <Link to={{ pathname: '/pair', state: { pair, me: user.data.me } }}>
            { pair.pair && <p><span>Currency Pair: </span>{ pair.pair }</p> }
            { pair.lotSize && <p><span>Lot Size: </span>{ pair.lotSize.toLocaleString() }.00</p> }
            { pair.position && <p><span>Position: </span>{ pair.position }</p> }
            { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
            { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
            { pair.updatedAt && <p><span>Updated At: </span>{ new Date(+pair.updatedAt).toLocaleString() }</p> }
          </Link>
        </div>
      ))}
      { data.getPairs && data.getPairs.map(pair => !pair.open && !open && (
        <div className='pair_divs' key={ pair.id }>
          <div>
            { pair.pair && <p><span>Currency Pair: </span>{ pair.pair }</p> }
            { pair.lotSize && <p><span>Lot Size: </span>{ pair.lotSize.toLocaleString() }.00</p> }
            { pair.position && <p><span>Position: </span>{ pair.position }</p> }
            { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
            { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt.toFixed(4) }</p> }
            { <p><span>Pip Dif: </span>{ pair.pipDif || 0 }</p> }
            { <p><span>Profit/Loss: </span>{ pair.profitLoss.toFixed(2) || 0 }</p> }
            { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
            { pair.updatedAt && <p><span>Updated At: </span>{ new Date(+pair.updatedAt).toLocaleString() }</p> }
          </div>
        </div>
      ))}
    </div>
  )
}
