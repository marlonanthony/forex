const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    currencyPairInfo(fc: String, tc: String): PairDisplay!
    monthlyTimeSeries(fc: String, tc: String): TimeSeries!
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): Boolean!
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

  type User {
    id: ID!
    email: String!
    name: String!
    bankroll: Float!
    pairs: [Pair]
    createdAt: String!
    updatedAt: String 
  }

  type Pair {
    id: ID!
    user: ID!
    pair: String!
    lotSize: Int!
    position: String!
    openedAt: Float!
    closedAt: Float
    pipDif: Float
    profitLoss: Float
    open: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = typeDefs