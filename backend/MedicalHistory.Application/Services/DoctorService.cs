using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;

namespace MedicalHistory.Application.Services;

public class DoctorService : IDoctorService
{
    private readonly IDoctorRepository _doctorRepository;

    public DoctorService(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<Guid> CreateDoctor(Doctor doctor)
    {
        return await _doctorRepository.Create(doctor);
    }

    public async Task<Guid> UpdateDoctor(Doctor doctor)
    {
        return await _doctorRepository.Update(doctor);
    }

    public async Task<Guid> DeleteDoctor(Guid id)
    {
        return await _doctorRepository.Delete(id);
    }

    public async Task<Doctor> GetDoctor(Guid id)
    {
        var doctor = await _doctorRepository.Get(id);
        return doctor;
    }

    public async Task<List<Doctor>> GetDoctorsBySpecialization(string specialization)
    {
        var doctors = await _doctorRepository.GetAll();
        var doctorBySpec = doctors.Where(d => d.Specialization == specialization).ToList();
        return doctorBySpec;
    }
}
