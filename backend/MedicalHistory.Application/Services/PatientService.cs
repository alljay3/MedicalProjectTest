using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;

namespace MedicalHistory.Application.Services;

public class PatientService : IPatientService
{
    public readonly IPatientRepository _patientRepository;

    public PatientService(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<Guid> CreatePatient(Patient patient)
    {
        return await _patientRepository.Create(patient);
    }

    public async Task<Guid> UpdatePatient(Patient patient)
    {
        return await _patientRepository.Update(patient);
    }

    public async Task<Guid> DeletePatient(Guid id)
    {
        return await _patientRepository.Delete(id);
    }

    public async Task<Patient> GetPatient(Guid id)
    {
        var patient = await _patientRepository.Get(id);
        return patient;
    }

    public async Task<List<Patient>> GetAllPatients()
    {
        return await _patientRepository.GetAll();
    }
}
