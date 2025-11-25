using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Repositories;
public interface IDoctorRepository
{
    Task<Guid> Create(Doctor doctor);
    Task<Guid> Delete(Guid id);
    Task<Doctor> Get(Guid id);
    Task<Guid> Update(Doctor doctor);
    Task<List<Doctor>> GetAll();
}