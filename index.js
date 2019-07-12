const app = require('express')()
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers') 
const CurrencyAPI = require('./datasources/currencies')

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    currencyAPI: new CurrencyAPI() 
  })
})

server.applyMiddleware({ app })

const PORT = 4000

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})