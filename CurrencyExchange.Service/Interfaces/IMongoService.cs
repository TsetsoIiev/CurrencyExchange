using MongoDB.Driver;

namespace CurrencyExchange.Service.Interfaces
{
    public interface IMongoService
    {
        IMongoCollection<T> GetCollection<T>(string databaseName, string collectionName) where T : class;
    }
}
