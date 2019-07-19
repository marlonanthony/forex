import gql from 'graphql-tag'

export const REGISTERMUTATION = gql`
    mutation RegisterMutation($email: String!, $password: String!, $name: String!) {
        register(email: $email, password: $password, name: $name)  
    }
`