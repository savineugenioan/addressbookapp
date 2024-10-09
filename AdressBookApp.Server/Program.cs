
using AddressBookApp.Server.Database;
using AddressBookApp.Server.Ports;
using AddressBookApp.Server.Repositories;
using AdressBookApp.Server.Exceptions;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace AdressBookApp.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection")));

            
            builder.Services.AddTransient<IPersonRepository, PersonRepository>();

            //serilog
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Configuration)
                .Enrich.FromLogContext()
                .CreateLogger();
            builder.Logging.AddSerilog(logger);

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
                //for demo purposes only
                var seedRowsNumbers = builder.Configuration.GetConnectionString("NumberOfPersonsToSeed");
                if (int.TryParse(seedRowsNumbers, out var NumberOfPersonsToSeed))
                {
                    if (NumberOfPersonsToSeed > 0)
                    {
                        var personRepository = scope.ServiceProvider.GetRequiredService<IPersonRepository>();
                        await personRepository.SeedPersonsDataAsync(NumberOfPersonsToSeed);
                    }
                }
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            //only for demo
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials());

            app.UseAuthorization();
            app.UseMiddleware<ExceptionMiddleware>();

            app.MapGet("/api/persons", (IPersonRepository personRepository) =>
            {
                return personRepository.GetAllPersonsAsync();
            })
            .WithName("Persons")
            .WithOpenApi();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
