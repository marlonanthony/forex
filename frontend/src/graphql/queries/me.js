import gql from 'graphql-tag'

export const MEQUERY = gql`
  query MeQuery {
    me {
      id
      email 
      name
      bankroll
      pairs {
        id
        pair
        lotSize
        position
        openedAt
        closedAt
        pipDif
        profitLoss
        open
        createdAt
        updatedAt
      }
    }
  }
`