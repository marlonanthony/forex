const resolvers = {
  Query: {
    currencyPairInfo: async (_, { fc, tc }, { dataSources }) => {
      try {
        const currencyPairs = await dataSources.currencyAPI.getCurrencyPair(fc, tc)
        return currencyPairs
      } catch (error) { throw err }
    },
    monthlyTimeSeries: async (_, { fc, tc }, { dataSources }) => {
      try {
        const timeSeries = await dataSources.currencyAPI.getMonthlyTimeSeries(fc, tc)
        return timeSeries
      } catch (error) { throw error }
    },
    me: async (_, __, { dataSources }) => {
      try {
        const user = await dataSources.userAPI.getMe()
        return user
      } catch (error) { throw error }
    },
    findPair: async (_, { id }, { dataSources }) => {
      try {
        const foundPair = await dataSources.userAPI.getPair({ id })
        return foundPair
      } catch (error) { throw error }
    },
    getPairs: async (_, __, { dataSources }) => {
      try {
        const foundPairs = await dataSources.userAPI.findPairs()
        return [...foundPairs]
      } catch (error) { throw error }
    },
  },

  Mutation: {
    register: async (_, { email, password, name }, { dataSources }) => {
      try {
        const newUser = await dataSources.userAPI.createNewUser({ email, password, name })
        return newUser
      } catch (error) { throw error }
    },
    login: async (_, { email, password }, { dataSources }) => {
      try {
        const user = await dataSources.userAPI.loginUser({ email, password })
        return user 
      } catch (error) { throw error }
    },
    logout: async (_, __, { req }) => {
      try { req.session.destroy(() => false) } 
      catch (error) { throw error }
    },
    openPosition: async (_, { pair, lotSize, openedAt, position }, { dataSources }) => {
      try {
        const open = await dataSources.userAPI.newPosition({ pair, lotSize, openedAt, position })
        return open 
      } catch (error) { throw error }
    },
    closePosition: async(_, { id, closedAt }, { dataSources }) => {
      try {
        const close = await dataSources.userAPI.exitPosition({ id, closedAt })
        return close 
      } catch (error) { throw error }
    },
    addFunds: async (_, { amount }, { dataSources }) => {
      try {
        const bandzAMakeHerDance = await dataSources.userAPI.additionalFunds({ amount })
        return bandzAMakeHerDance
      } catch (error) { throw error }
    }
  }
}

module.exports = resolvers