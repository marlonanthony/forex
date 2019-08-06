import gql from 'graphql-tag'

export const ADDFUNDS = gql`
  mutation ($amount: Int!) {
    addFunds(amount: $amount) {
      success
      message
      user {
        id
        name
        email
        bankroll
      }
    }
  }
`