const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    currencyPairInfo(fc: String, tc: String): PairDisplay!
    monthlyTimeSeries(fc: String, tc: String): TimeSeries!
    me: User
    findPair(id: ID!): Pair!
    getPairs: [Pair!]
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): Boolean!
    login(email: String!, password: String!): User!
    logout: Boolean
    openPosition(pair: String!, lotSize: Int, openedAt: Float!, position: String!): PairUpdateResponse!
    closePosition(id: ID!, closedAt: Float!): PairUpdateResponse!
    addFunds(amount: Int!): AddFundsResponse!
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

  type PairUpdateResponse {
    success: Boolean!
    message: String!
    pair: Pair!
  }

  type AddFundsResponse {
    success: Boolean!
    message: String!
    user: User!
  }
`

module.exports = typeDefs