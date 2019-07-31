import gql from 'graphql-tag'

export const MEQUERY = gql`
  query MeQuery {
    me {
      id
      email 
      name
      bankroll
    }
  }
`