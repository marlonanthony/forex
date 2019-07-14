const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    currencyPairInfo(fc: String, tc: String): PairDisplay!
    monthlyTimeSeries(fc: String, tc: String): TimeSeries!
  }

  type PairDisplay {
    fromCurrency: String!
    fromCurrencyName: String
    toCurrency: String!
    toCurrencyName: String
    exchangeRate: String
    lastRefreshed: String
    timeZone: String
    bidPrice: String
    askPrice: String
  }

  type TimeSeries {
    timesArray: [String!]!
    valuesArray: [String!]!
  }
`

module.exports = typeDefs