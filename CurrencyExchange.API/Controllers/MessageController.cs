using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CurrencyExchange.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService messageService;

        public MessageController(IMessageService messageService)
        {
            this.messageService = messageService;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SendMessage(MessageBase message)
        {
            await messageService.GetMessage(message);

            return Accepted();
        }
    }
}
