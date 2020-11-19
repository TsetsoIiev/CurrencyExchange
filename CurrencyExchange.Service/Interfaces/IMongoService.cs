using CurrencyExchange.Service.Models;
using System;

namespace CurrencyExchange.Service.Interfaces
{
    public interface IMongoService
    {
        Currencies[] GetCurrenciesForPeriod(DateTime from, DateTime to);
    }
}
