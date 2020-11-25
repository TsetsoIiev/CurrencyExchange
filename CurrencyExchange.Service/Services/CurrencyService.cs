using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using Newtonsoft.Json;
using RestSharp;
using System;
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

        public string[] GetCurrencies()
        {
            return new Rates().GetType().GetProperties().Select(x => x.Name).ToArray();
        }

        public async Task<double> GetRates(string baseCurrency, string toCurrency, double ammount)
        {
            var client = new RestClient($"{AppSettings.ApiEndpoint}{AppSettings.ApiEndpointLatest}");

            var request = new RestRequest(Method.GET);
            request.AddQueryParameter("access_key", AppSettings.ApiAccessKey);

            var response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                dynamic rates = JsonConvert.DeserializeObject<Currencies>(response.Content).Rates;

                var baseCurrencyRate = rates.GetType().GetProperty(baseCurrency);
                double.TryParse(baseCurrencyRate.GetValue(rates).ToString(), out double baseCurrencyRateValue);

                var toCurrencyRate = rates.GetType().GetProperty(toCurrency);
                double.TryParse(toCurrencyRate.GetValue(rates).ToString(), out double toCurrencyRateValue);

                var rate = toCurrencyRateValue / baseCurrencyRateValue;
                var finalAmmount = rate * ammount;

                return Math.Round(finalAmmount, 2);
            }

            return 0;
        }

        public double[] GetRatesForPeriod(string currency, DateTime from, DateTime to)
        {
            throw new NotImplementedException();
        }
    }
}
