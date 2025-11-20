using MedicalHistory.Persistance.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalHistory.Persistance.Configurations;

public class DiseaseConfiguration : IEntityTypeConfiguration<DiseaseEntity>
{
    public void Configure(EntityTypeBuilder<DiseaseEntity> builder)
    {
        builder.HasKey(p => p.Id);

        builder.HasOne(d => d.AttendingDoctor).WithMany(doc => doc.Diseases);

        builder.HasOne(p => p.CurrentPatient).WithMany(doc => doc.Diseases);
    }
}
