const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers') 
const CurrencyAPI = require('./datasources/currencies')
const UserAPI = require('./datasources/user')
const { mongoPassword, secret } = require('./config/keys')

const app = express()

app.use(cors()) 

app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}))

app.use('/static', express.static(path.join(__dirname, '/static/static')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'))
})

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    currencyAPI: new CurrencyAPI(),
    userAPI: new UserAPI()
  }),
  context: ({ req }) => ({ req }),
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
  introspection: true,
  playground: { endpoint: '/graphql' }
})

server.applyMiddleware({ 
  path: '*',
  app,
  cors: {
      credentials: true,
      origin: 'http://localhost:3000'
  }
})

mongoose
.connect(
  // `mongodb+srv://marlon:${mongoPassword}@cluster0-o028g.mongodb.net/forex?retryWrites=true&w=majority`,
  `mongodb://marlon:${mongoPassword}@cluster0-shard-00-00-qpcr4.mongodb.net:27017,cluster0-shard-00-01-qpcr4.mongodb.net:27017,cluster0-shard-00-02-qpcr4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true })
.then(() => app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})).catch(err => console.log(err)) 