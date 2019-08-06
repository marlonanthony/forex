import gql from 'graphql-tag'

export const CLOSEPOSITION = gql`
  mutation ClosePosition($id: ID!, $closedAt: Float!) {
    closePosition(id: $id, closedAt: $closedAt) {
      success
      message
      pair {
        id
        user
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