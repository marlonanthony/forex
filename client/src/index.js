import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory' 
import { HttpLink } from 'apollo-link-http'

import App from './App'
import './index.css'

const cache = new InMemoryCache() 
const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: '/graphql',
        credentials: 'include' 
    })
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>, document.getElementById('root')
)