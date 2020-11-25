using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using System.Threading.Tasks;

namespace CurrencyExchange.Service.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMongoService mongoService;

        public MessageService(IMongoService mongoService)
        {
            this.mongoService = mongoService;
        }

        public async Task GetMessage(MessageBase message)
        {
            var collection = mongoService.GetCollection<MessageBase>("currency_converter", "messages");

            await collection.InsertOneAsync(message);
        }
    }
}
