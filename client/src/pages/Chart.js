import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useQuery } from '@apollo/react-hooks'

import { MONTHLYTIMESERIES } from '../graphql/queries/monthlyTimeSeries'

export default function Chart() {
  const [fc, setFc] = useState('EUR'),
        [tc, setTc] = useState('USD'), 
        [fromCurrency, setFromCurrency] = useState('EUR'), 
        [toCurrency, setToCurrency] = useState('USD'),
        { data, error, loading, refetch } = useQuery(MONTHLYTIMESERIES, {
          variables: { fc, tc }
        })

  if(loading) return <p>loading...</p>
  if(error) return <button onClick={() => {
    refetch({ fc: 'EUR', tc: 'USD' })
    window.location.href = '/chart'
  }}>retry</button>
  
  const labels = data && data.monthlyTimeSeries.timesArray,
        chartData = data && data.monthlyTimeSeries.valuesArray
  

  return (
    <section className='chartData'>
      <form onSubmit={e => {
        e.preventDefault()
        setFc(fromCurrency)
        setTc(toCurrency) 
      }}>
        <input 
          name='fromCurrency'
          value={fromCurrency}
          placeholder='From Currency'
          onChange={e => setFromCurrency(e.target.value.toUpperCase())}
        />
        <input 
          name='toCurrency'
          value={toCurrency}
          placeholder='To Currency'
          onChange={e => setToCurrency(e.target.value.toUpperCase())}
        />
        <button>submit</button>
      </form>
      <Line data={{
        labels,
        datasets: [
          {
            label: `${fc}/${tc} Time Series FX (Monthly)`,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgb(55, 131, 194)',
            borderColor: 'white',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartData
          }
        ]
      }} />
    </section>
  )
}