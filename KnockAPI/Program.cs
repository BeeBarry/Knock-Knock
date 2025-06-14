using KnockAPI.IRepository;
using KnockAPI.Repository;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;

var builder = FunctionsApplication.CreateBuilder(args);

var config = builder.Configuration;
string conn = config["Mongo:ConnectionString"]!;
string db = config["Mongo:Database"]!;

builder.Services
    .AddSingleton<IMongoClient>(_ => new MongoClient(conn))
    .AddSingleton(sp => sp.GetRequiredService<IMongoClient>().GetDatabase(db))
    .AddSingleton<IAccountRepository, AccountRepository>()
    .AddSingleton<IProfileRepository, UserRepository>();

builder.ConfigureFunctionsWebApplication();
builder.Build().Run();
