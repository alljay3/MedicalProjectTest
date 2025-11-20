using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Models;
using MedicalHistory.Persistance.Entities;
using Microsoft.EntityFrameworkCore;

namespace MedicalHistory.Persistance.Repositories;

public class PatientRepository : IPatientRepository
{
    private readonly MedicalHistoryDbContext _context;

    public PatientRepository(MedicalHistoryDbContext context)
    {
        _context = context;
    }


    public async Task Add(Patient patient)
    {
        var patientEntity = new PatientEntity()
        {
            Id = patient.Id,
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            Patronymic = patient.Patronymic,
            Gender = patient.Gender,
            BirthDate = patient.BirthDate,
        };
        await _context.AddAsync(patientEntity);
        await _context.SaveChangesAsync();
    }

    public async Task<Patient> Get(Guid id)
    {
        var patientEntity = await _context.Patients.AsNoTracking().FirstOrDefaultAsync(doc => doc.Id == id) ?? throw new Exception();
        return new Patient(patientEntity.Id, patientEntity.FirstName, patientEntity.LastName, patientEntity.Patronymic, patientEntity.Gender, patientEntity.BirthDate);
    }


    public async Task<Guid> Update(Patient patient)
    {
        await _context.Patients.Where(p => p.Id == patient.Id)
           .ExecuteUpdateAsync(s => s
           .SetProperty(s => s.FirstName, patient.FirstName)
           .SetProperty(s => s.LastName, patient.LastName)
           .SetProperty(s => s.Patronymic, patient.Patronymic)
           .SetProperty(s => s.Gender, patient.Gender)
           .SetProperty(s => s.BirthDate, patient.BirthDate));
        return patient.Id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _context.Patients.Where(p => p.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }

}
