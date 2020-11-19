using CurrencyExchange.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyExchange.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyService currencyService;

        public CurrencyController(ICurrencyService currencyService)
        {
            this.currencyService = currencyService;
        }

        [HttpGet]
        public IActionResult GetRatesByCurrency(string baseCurrency, string nextCurrency, double quantity)
        {
            return Ok(currencyService.GetRates(baseCurrency, nextCurrency, quantity));
        }
    }
}