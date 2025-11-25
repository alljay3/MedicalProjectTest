using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Services;
public interface IPatientService
{
    Task<Guid> CreatePatient(Patient patient);
    Task<Guid> DeletePatient(Guid id);
    Task<List<Patient>> GetAllPatients();
    Task<Patient> GetPatient(Guid id);
    Task<Guid> UpdatePatient(Patient patient);
}