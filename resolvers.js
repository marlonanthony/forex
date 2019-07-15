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
    me: async (_, __, { dataSources, req }) => {
      try {
        const user = await dataSources.userAPI.getMe({ req })
        return user
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
    login: async (_, { email, password }, { dataSources, req }) => {
      try {
        const user = await dataSources.userAPI.loginUser({ email, password, req })
        return user 
      } catch (error) { throw error }
    },
  }
}

module.exports = resolvers