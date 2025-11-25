using System.Numerics;
using MedicalHistory.Core.Models;
using MedicalHistory.Persistance.Entities;

namespace MedicalHistory.Persistance.Mappers;

public class PatientMapper
{
    public static Patient Create(PatientEntity? patient)
    {
        if (patient == null) throw new ArgumentNullException(nameof(patient));
        return new Patient(patient.Id, patient.FirstName, patient.LastName, patient.Patronymic, patient.Gender, patient.BirthDate);
    }
}
