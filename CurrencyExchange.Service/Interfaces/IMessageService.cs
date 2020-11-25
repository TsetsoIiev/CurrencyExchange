using CurrencyExchange.Service.Models;
using System.Threading.Tasks;

namespace CurrencyExchange.Service.Interfaces
{
    public interface IMessageService
    {
        Task GetMessage(MessageBase message);
    }
}
