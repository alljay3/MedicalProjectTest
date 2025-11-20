using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Repositories;
public interface IPatientRepository
{
    Task Add(Patient patient);
    Task<Guid> Delete(Guid id);
    Task<Patient> Get(Guid id);
    Task<Guid> Update(Patient patient);
}