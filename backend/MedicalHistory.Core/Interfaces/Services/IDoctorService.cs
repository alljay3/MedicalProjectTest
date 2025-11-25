using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Services;
public interface IDoctorService
{
    Task<Guid> CreateDoctor(Doctor doctor);
    Task<Guid> DeleteDoctor(Guid id);
    Task<Doctor> GetDoctor(Guid id);
    Task<List<Doctor>> GetDoctorsBySpecialization(string specialization);
    Task<Guid> UpdateDoctor(Doctor doctor);
}