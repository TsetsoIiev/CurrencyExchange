using System;
using System.Threading.Tasks;

namespace CurrencyExchange.Service.Interfaces
{
    public interface ICurrencyService
    {
        Task<double> GetRates(string baseCurrency, string toCurrency, double ammount);

        double[] GetRatesForPeriod(string currency, DateTime from, DateTime to);

        string[] GetCurrencies();
    }
}
