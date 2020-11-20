using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using MongoDB.Bson;
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

            var filter = Builders<Currencies>.Filter.And(
                    Builders<Currencies>.Filter.Gte("Timestamp", timestampFrom),
                    Builders<Currencies>.Filter.Lte("Timestamp", timestampTo)
                );

            var result = collection.Find(filter).ToList();

            return result.ToArray();
        }
    }
}
