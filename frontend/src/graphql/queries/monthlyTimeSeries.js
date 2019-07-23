import gql from 'graphql-tag' 

export const MONTHLYTIMESERIES = gql`
  query MonthlyTimeSeries($fc: String, $tc: String) {
    monthlyTimeSeries(fc: $fc, tc: $tc) {
      timesArray
      valuesArray
    }
  }
`