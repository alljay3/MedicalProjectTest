using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Repositories;
public interface IDoctorRepository
{
    Task Add(Doctor doctor);
    Task<Guid> Delete(Guid id);
    Task<Doctor> Get(Guid id);
    Task<Guid> Update(Doctor doctor);
}