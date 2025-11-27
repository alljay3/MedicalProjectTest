using MedicalHistory.Application.Services;
using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Persistance;
using MedicalHistory.Persistance.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
var services = builder.Services;


builder.Services.AddSwaggerGen();

services.AddControllers();
services.AddDbContext<MedicalHistoryDbContext>(
    options =>
    {
        options.UseNpgsql(configuration.GetConnectionString(nameof(MedicalHistoryDbContext)));
    });

services.AddScoped<IDiseaseRepository, DiseaseRepository>();
services.AddScoped<IDoctorRepository, DoctorRepository>();
services.AddScoped<IPatientRepository, PatientRepository>();
services.AddScoped<IDiseaseService, DiseaseService>();
services.AddScoped<IPatientService, PatientService>();
services.AddScoped<IDoctorService, DoctorService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MedicalHistoryDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.UseCors(x =>
{
    x.AllowAnyHeader();
    x.AllowAnyMethod();
    x.AllowAnyOrigin();
});

app.Run();
