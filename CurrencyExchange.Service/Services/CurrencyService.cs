using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using MongoDB.Driver;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CurrencyExchange.Service.Services
{
    public class CurrencyService : ICurrencyService
    {
        private readonly IMongoService mongoService;

        public CurrencyService(IMongoService mongoService)
        {
            this.mongoService = mongoService;
        }

        public IEnumerable<string> GetCurrencies()
        {
            return new Rates().GetType().GetProperties().Select(x => x.Name);
        }

        public async Task<double> GetRates(string baseCurrency, string targetCurrency, double ammount)
        {
            var client = new RestClient($"{AppSettings.ApiEndpoint}{AppSettings.ApiEndpointLatest}");

            var request = new RestRequest(Method.GET);
            request.AddQueryParameter("access_key", AppSettings.ApiAccessKey);

            var response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var rates = JsonConvert.DeserializeObject<Currencies>(response.Content).Rates;
                return GetRatesFromCurrencies(baseCurrency, targetCurrency, rates, ammount);
            }

            return 0;
        }

        public IEnumerable<RateForPeriod> GetRatesForPeriod(string baseCurrency, string targetCurrency, DateTime from, DateTime to)
        {
            var collection = mongoService.GetCollection<Currencies>("currency_converter", "historical_currencies");

            var filter = Builders<Currencies>.Filter.And(
                    Builders<Currencies>.Filter.Gte("Date", from),
                    Builders<Currencies>.Filter.Lte("Date", to)
                );

            var result = collection.Find(filter).ToList().Select(x => new RateForPeriod
            {
                Date = x.Date,
                Rate = GetRatesFromCurrencies(baseCurrency, targetCurrency, x.Rates)
            });

            return result;
        }

        private double GetRatesFromCurrencies(string baseCurrency, string toCurrency, Rates rates, double ammount = 1.0)
        {
            var baseCurrencyRateValue = GetCurrencyRateFromCurrency(rates, baseCurrency);
            var toCurrencyRateValue = GetCurrencyRateFromCurrency(rates, toCurrency);

            var rate = toCurrencyRateValue / baseCurrencyRateValue;
            var finalAmmount = rate * ammount;

            return Math.Round(finalAmmount, 2);
        }

        private double GetCurrencyRateFromCurrency(Rates rate, string currency)
        {
            var baseCurrencyRate = rate.GetType().GetProperty(currency);
            double.TryParse(baseCurrencyRate.GetValue(rate).ToString(), out double currencyRateValue);

            return currencyRateValue;
        }
    }
}
