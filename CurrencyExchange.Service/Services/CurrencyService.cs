using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using Newtonsoft.Json;
using RestSharp;
using System.Net;

namespace CurrencyExchange.Service.Services
{
    public class CurrencyService : ICurrencyService
    {
        public double GetRates(string baseCurrency, string toCurrency, double ammount)
        {
            var client = new RestClient($"{AppSettings.ApiEndpoint}{AppSettings.ApiEndpointLatest}");
            
            var request = new RestRequest(Method.GET);
            request.AddQueryParameter("access_key", AppSettings.ApiAccessKey);

            var response = client.Execute(request);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var rates = JsonConvert.DeserializeObject<Currencies>(response.Content).Rates;

                var baseCurrencyRate = rates.GetType().GetProperty(baseCurrency);
                double.TryParse(baseCurrencyRate.GetValue(rates).ToString(), out double baseCurrencyRateValue);

                var toCurrencyRate = rates.GetType().GetProperty(toCurrency);
                double.TryParse(toCurrencyRate.GetValue(rates).ToString(), out double toCurrencyRateValue);

                var rate = toCurrencyRateValue / baseCurrencyRateValue;
                var finalAmmount = rate * ammount;

                return finalAmmount;
            }

            return 0;
        }
    }
}
