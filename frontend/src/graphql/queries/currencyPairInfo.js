import gql from 'graphql-tag'

export const CURRENCY_PAIR_INFO = gql`
  query CurrencyPairInfo($fc: String, $tc: String) {
    currencyPairInfo(tc: $tc, fc: $fc) {
      fromCurrency 
      fromCurrencyName
      toCurrency
      toCurrencyName
      exchangeRate
      lastRefreshed
      timeZone
      bidPrice
      askPrice
    }
  }
`