import gql from 'graphql-tag'

export const GETPAIRS = gql`
  query GetPairs {
    getPairs {
      id
      user
      pair
      lotSize
      openedAt
      closedAt
      pipDif
      profitLoss
      open
      position
      createdAt
      updatedAt
    }
  }
`