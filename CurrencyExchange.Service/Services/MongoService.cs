using CurrencyExchange.Service.Interfaces;
using MongoDB.Driver;

namespace CurrencyExchange.Service.Services
{
    public class MongoService : IMongoService
    {
        public IMongoCollection<T> GetCollection<T>(string databaseName, string collectionName) where T : class
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false");
            var database = mongoClient.GetDatabase(databaseName);
            var collection = database.GetCollection<T>(collectionName);

            return collection;
        }
    }
}
