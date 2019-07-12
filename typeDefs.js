const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    currencyPairInfo(fc: String, tc: String): PairDisplay!
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
`

module.exports = typeDefs