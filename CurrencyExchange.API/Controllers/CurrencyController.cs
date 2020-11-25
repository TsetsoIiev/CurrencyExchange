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
        public async Task<IActionResult> GetRatesByCurrency(string baseCurrency, string nextCurrency, double quantity)
        {
            return Ok(await currencyService.GetRates(baseCurrency, nextCurrency, quantity));
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRatesByDate(DateTime from, DateTime to)
        {
            return Ok(mongoService.GetCurrenciesForPeriod(from, to));
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCurrencies()
        {
            return Ok(currencyService.GetCurrencies());
        }
    }
}