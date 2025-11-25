using System.Xml.Linq;
using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Models;
using MedicalHistory.Persistance.Entities;
using MedicalHistory.Persistance.Mappers;
using Microsoft.EntityFrameworkCore;

namespace MedicalHistory.Persistance.Repositories;

public class DiseaseRepository : IDiseaseRepository
{
    private readonly MedicalHistoryDbContext _context;

    public DiseaseRepository(MedicalHistoryDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Create(Disease disease)
    {
        DoctorEntity doctorEntity = await _context.Doctors.AsNoTracking().FirstOrDefaultAsync(doc => doc.Id == disease.AttendingDoctor.Id) ?? throw new Exception();
        PatientEntity patientEntity = await _context.Patients.AsNoTracking().FirstOrDefaultAsync(p => p.Id == disease.CurrentPatient.Id) ?? throw new Exception();
        var DiseaseEntity = new DiseaseEntity()
        {
            Id = disease.Id,
            Name = disease.Name,
            CurrentPatient = patientEntity,
            AttendingDoctor = doctorEntity,
            DiagnosisDate = disease.DiagnosisDate,
            Symptoms = disease.Symptoms,
            Treatment = disease.Treatment
        };
        await _context.AddAsync(DiseaseEntity);
        await _context.SaveChangesAsync();
        return disease.Id;
    }

    public async Task<Disease> Get(Guid id)
    {
        var diseaseEntity = await _context.Diseases.AsNoTracking().Include(d => d.CurrentPatient).Include(d => d.AttendingDoctor).FirstOrDefaultAsync(d => d.Id == id) ?? throw new Exception();
        return Disease.Create(diseaseEntity.Id, diseaseEntity.Name, PatientMapper.Create(diseaseEntity.CurrentPatient), DoctorMapper.Create(diseaseEntity.AttendingDoctor), diseaseEntity.Symptoms,
            diseaseEntity.Treatment, diseaseEntity.DiagnosisDate);
    }


    public async Task<Guid> Update(Disease disease)
    {
        DoctorEntity doctorEntity = await _context.Doctors.AsNoTracking().FirstOrDefaultAsync(doc => doc.Id == disease.AttendingDoctor.Id) ?? throw new Exception();
        PatientEntity patientEntity = await _context.Patients.AsNoTracking().FirstOrDefaultAsync(p => p.Id == disease.CurrentPatient.Id) ?? throw new Exception();
        await _context.Diseases.Where(d => d.Id == disease.Id)
           .ExecuteUpdateAsync(s => s
           .SetProperty(s => s.Name, disease.Name)
           .SetProperty(s => s.CurrentPatient, patientEntity)
           .SetProperty(s => s.AttendingDoctor, doctorEntity)
           .SetProperty(s => s.DiagnosisDate, disease.DiagnosisDate)
           .SetProperty(s => s.Symptoms, disease.Symptoms)
           .SetProperty(s => s.Treatment, disease.Treatment));
        return disease.Id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _context.Diseases.Where(d => d.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }

    public async Task<List<Disease>> GetAll()
    {
        var diseaseEntity = await _context.Diseases.AsNoTracking().Include(d => d.CurrentPatient).Include(d => d.AttendingDoctor).ToListAsync();
        var diseases = diseaseEntity.Select(d => Disease.Create(d.Id, d.Name, PatientMapper.Create(d.CurrentPatient), DoctorMapper.Create(d.AttendingDoctor), d.Symptoms,
            d.Treatment, d.DiagnosisDate)).ToList();
        return diseases;
    }
}
