using CurrencyExchange.Service.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson.Serialization;

namespace CurrencyExchange.Service
{
    public class Program
    {
        public static IConfigurationRoot configuration;

        public static void Main(string[] args)
        {
            BsonClassMap.RegisterClassMap<Currencies>(cm => {
                cm.AutoMap();
            });

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args);

    }
}
