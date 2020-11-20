using CurrencyExchange.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace CurrencyExchange.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        public IActionResult GetRatesByCurrency(string baseCurrency, string nextCurrency, double quantity)
        {
            return Ok(currencyService.GetRates(baseCurrency, nextCurrency, quantity));
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