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
    }
  }
}

module.exports = resolvers