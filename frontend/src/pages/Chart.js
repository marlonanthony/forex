import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Query } from 'react-apollo'

import { MONTHLYTIMESERIES } from '../graphql/queries/monthlyTimeSeries'
import Spinner from '../components/spinner/Spinner'

const Chart = () => {
  const [fc, setFc] = useState('EUR'),
        [tc, setTc] = useState('USD'), 
        [fromCurrency, setFromCurrency] = useState('EUR'), 
        [toCurrency, setToCurrency] = useState('USD')

  return (
    <Query query={MONTHLYTIMESERIES} variables={{ fc, tc }}>
      {({ data, loading, error }) => {
        if(loading) return <Spinner />
        if(error) return <p>{ error.message }</p>
        if(data) {
          const labels = data.monthlyTimeSeries.timesArray
          const chartData = data.monthlyTimeSeries.valuesArray

          return (
            <div className='chartData'>
              <form onSubmit={e => {
                e.preventDefault()
                setFc(fromCurrency)
                setTc(toCurrency) 
              }}>
                <input 
                  name='fromCurrency'
                  value={fromCurrency}
                  placeholder='From Currency'
                  onChange={e => setFromCurrency(e.target.value)}
                />
                <input 
                  name='toCurrency'
                  value={toCurrency}
                  placeholder='To Currency'
                  onChange={e => setToCurrency(e.target.value)}
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
            </div>
          )
        }
      }}
    </Query>
  )
}

export default Chart