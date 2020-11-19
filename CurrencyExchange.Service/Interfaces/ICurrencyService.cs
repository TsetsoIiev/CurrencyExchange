namespace CurrencyExchange.Service.Interfaces
{
    public interface ICurrencyService
    {
        double GetRates(string baseCurrency, string toCurrency, double ammount);
    }
}
