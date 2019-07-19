import React from 'react'

export default function SelectList({ fc, setFc, tc, setTc }) {
  return (
    <select
      value={`${fc}/${tc}`}
      onChange={e => {
          const [fromCurrency, toCurrency] = e.target.value.split('/')
          setFc(fromCurrency)
          setTc(toCurrency)
      }}>
      <option>EUR/USD</option>
      <option>USD/JPY</option>
      <option>GBP/USD</option>
      <option>AUD/USD</option>
      <option>USD/CHF</option>
      <option>NZD/USD</option>
      <option>USD/CAD</option>
    </select>
  )
}