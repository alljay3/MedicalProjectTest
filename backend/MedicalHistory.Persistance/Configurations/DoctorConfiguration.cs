using MedicalHistory.Persistance.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalHistory.Persistance.Configurations;

public class DoctorConfiguration : IEntityTypeConfiguration<DoctorEntity>
{
    public void Configure(EntityTypeBuilder<DoctorEntity> builder)
    {
        builder.HasKey(doc => doc.Id);
    }
}
