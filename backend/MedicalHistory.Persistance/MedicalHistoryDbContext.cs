using MedicalHistory.Persistance.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MedicalHistory.Persistance;

public class MedicalHistoryDbContext(DbContextOptions<MedicalHistoryDbContext> options) : DbContext(options)
{
    public DbSet<DiseaseEntity> Diseases { get; set; }

    public DbSet<DoctorEntity> Doctors { get; set; }

    public DbSet<PatientEntity> Patients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MedicalHistoryDbContext).Assembly);
    }
}
