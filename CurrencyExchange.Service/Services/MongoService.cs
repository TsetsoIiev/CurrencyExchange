using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using MongoDB.Driver;
using System;
using System.Linq;

namespace CurrencyExchange.Service.Services
{
    public class MongoService : IMongoService
    {
        public Currencies[] GetCurrenciesForPeriod(DateTime from, DateTime to)
        {
            var timestampFrom = (int)from.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
            var timestampTo = (int)to.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;


            var mongoClient = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false");
            var database = mongoClient.GetDatabase("currency_converter");
            var collection = database.GetCollection<Currencies>("historical_currencies");

            var result = collection.Find(x => x.Timestamp >= timestampFrom && x.Timestamp <= timestampTo).ToList().ToArray();

            return result;
        }
    }
}
