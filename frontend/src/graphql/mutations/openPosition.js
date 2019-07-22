import gql from 'graphql-tag'

export const OPENPOSITION = gql`
    mutation OpenPosition($pair: String!, $lotSize: Int!, $openedAt: Float!, $position: String!) {
        openPosition(pair: $pair, lotSize: $lotSize, openedAt: $openedAt, position: $position) {
            success
            message
            pair {
                id
                user
                position
                pair
                lotSize
                openedAt
            }
        }
    }
`