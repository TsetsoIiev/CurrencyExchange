using CurrencyExchange.Service.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CurrencyExchange.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [DisableCors]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyService currencyService;
        private readonly IMongoService mongoService;

        public CurrencyController(ICurrencyService currencyService, IMongoService mongoService)
        {
            this.currencyService = currencyService;
            this.mongoService = mongoService;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRatesByCurrency(string baseCurrency, string targetCurrency, double quantity)
        {
            return Ok(await currencyService.GetRates(baseCurrency, targetCurrency, quantity));
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRatesByDate(string baseCurrency, string targetCurrency, DateTime from, DateTime to)
        {
            return Ok(currencyService.GetRatesForPeriod(baseCurrency, targetCurrency, from, to));
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCurrencies()
        {
            return Ok(currencyService.GetCurrencies());
        }
    }
}