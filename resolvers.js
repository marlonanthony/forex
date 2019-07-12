const resolvers = {
  Query: {
    currencyPairInfo: async (_, { fc, tc }, { dataSources }) => {
      try {
        const currencyPairs = await dataSources.currencyAPI.getCurrencyPair(fc, tc)
        return currencyPairs
      } catch (error) { throw err }
    }
  }
}

module.exports = resolvers