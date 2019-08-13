const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers') 
const CurrencyAPI = require('./datasources/currencies')
const UserAPI = require('./datasources/user')
const { mongoPassword, secret } = require('./config/keys')

const app = express()

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
  }
})

app.use(express.static('public'))

app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}))

app.get('*', (req, res) => {
  res.send(path.resolve(__dirname, 'public', 'index.html'))
})

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'))
// }

server.applyMiddleware({ 
  app, 
  cors: {
      credentials: true,
      origin: 'http://localhost:3000'
  }
})


mongoose
.connect(`mongodb+srv://marlon:${mongoPassword}@cluster0-o028g.mongodb.net/forex?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then(() => app.listen(process.env.PORT || 4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})).catch(err => console.log(err)) 