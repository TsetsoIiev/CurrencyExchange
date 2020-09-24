using CurrencyExchange.Service.Interfaces;

namespace CurrencyExchange.Service.Services
{
    public class CurrencyService : ICurrencyService
    {
        private readonly IRequestService requestService;

        public CurrencyService(IRequestService requestService)
        {
            this.requestService = requestService;
        }

        public string Ok()
        {
            return "Ok";
        }
    }
}
