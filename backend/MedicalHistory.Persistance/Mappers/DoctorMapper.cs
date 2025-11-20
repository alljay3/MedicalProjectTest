using MedicalHistory.Core.Models;
using MedicalHistory.Persistance.Entities;

namespace MedicalHistory.Persistance.Mappers;

public class DoctorMapper
{
    public static Doctor Create(DoctorEntity? doctor)
    {
        if (doctor == null) throw new ArgumentNullException(nameof(doctor));
        return new Doctor(doctor.Id, doctor.FirstName, doctor.LastName, doctor.Patronymic, doctor.Specialization , doctor.Gender, doctor.BirthDate);
    }
}
