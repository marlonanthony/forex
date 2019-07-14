const { RESTDataSource } = require('apollo-datasource-rest') 
const keys = require('../config/keys')

class CurrencyAPI extends RESTDataSource {
    constructor() {
        super() 
        this.baseURL = ''
    }

    async getCurrencyPair(fc='EUR', tc='USD') {
        try {
            const data = await this.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fc}&to_currency=${tc}&apikey=${keys.alphaVantageAPIKey}`),
                  response = data['Realtime Currency Exchange Rate'] || '',
                  fromCurrency = response['1. From_Currency Code'] || '',
                  fromCurrencyName = response['2. From_Currency Name'] || '',
                  toCurrency = response['3. To_Currency Code'] || '',
                  toCurrencyName = response['4. To_Currency Name'] || '',
                  exchangeRate = response['5. Exchange Rate'] || '',
                  lastRefreshed = response['6. Last Refreshed'] || '',
                  timeZone = response['7. Time Zone'] || '',
                  bidPrice = response['8. Bid Price'] || '',
                  askPrice = response['9. Ask Price'] || ''
            return data && response && {
                fromCurrency,
                fromCurrencyName,
                toCurrency,
                toCurrencyName,
                exchangeRate,
                lastRefreshed,
                timeZone,
                bidPrice,
                askPrice
            }
        } catch (err) { throw err }
    }

    async getMonthlyTimeSeries(fc='EUR', tc='USD') {
        try {
            const data = await this.get(`https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${fc}&to_symbol=${tc}&apikey=${keys.alphaVantageAPIKey}`),
                  timeSeries = data && data['Time Series FX (Monthly)'],
                  timesArray = Object.keys(timeSeries).reverse(),
                  valuesArray = Object.values(timeSeries).map(val => val['4. close']).reverse()
            return { timesArray, valuesArray }

        } catch (error) { throw error }
    }
}

module.exports = CurrencyAPI