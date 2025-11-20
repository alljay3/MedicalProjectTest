using MedicalHistory.Persistance;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

var services = builder.Services;
services.AddControllers();
services.AddDbContext<MedicalHistoryDbContext>(
    options =>
    {
        options.UseNpgsql(configuration.GetConnectionString(nameof(MedicalHistoryDbContext)));
    });

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
