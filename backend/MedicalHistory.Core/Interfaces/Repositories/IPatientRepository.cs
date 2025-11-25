using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Repositories;
public interface IPatientRepository
{
    Task<Guid> Create(Patient patient);
    Task<Guid> Delete(Guid id);
    Task<Patient> Get(Guid id);
    Task<Guid> Update(Patient patient);
    Task<List<Patient>> GetAll();
}