using CurrencyExchange.Service.Interfaces;
using CurrencyExchange.Service.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CurrencyExchange.API
{
    public class Startup
    {
        private readonly string CorsPolicyName = "Default";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy(name: CorsPolicyName,
                                builder =>
                                {
                                    builder
                                        .AllowAnyOrigin()
                                        .AllowAnyMethod()
                                        .AllowAnyHeader();
                                });
            });

            services.AddSwaggerGen();

            services.AddScoped<ICurrencyService, CurrencyService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IMongoService, MongoService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints
                    .MapControllers()
                    .RequireCors(CorsPolicyName);
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v.1");
            });
        }
    }
}
