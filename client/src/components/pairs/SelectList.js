import React from 'react'

const SelectList = ({ fc, setFc, tc, setTc }) => (
  <select
    value={`${fc}/${tc}`}
    onChange={e => {
      const [fromCurrency, toCurrency] = e.target.value.split('/')
      setFc(fromCurrency)
      setTc(toCurrency)
    }}>
    <option>EUR/USD</option>
    <option>JPY/USD</option>
    <option>GBP/USD</option>
    <option>AUD/USD</option>
    <option>USD/CHF</option>
    <option>NZD/USD</option>
    <option>USD/CAD</option>
  </select>
)

export default SelectList