using CurrencyExchange.Service.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CurrencyExchange.Service.Interfaces
{
    public interface ICurrencyService
    {
        Task<double> GetRates(string baseCurrency, string targetCurrency, double ammount);
        IEnumerable<RateForPeriod> GetRatesForPeriod(string baseCurrency, string targetCurrency, DateTime from, DateTime to);
        IEnumerable<string> GetCurrencies();
    }
}
