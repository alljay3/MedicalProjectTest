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
        var diseaseEntity = new DiseaseEntity()
        {
            Id = disease.Id,
            Name = disease.Name,
            CurrentPatient = patientEntity,
            AttendingDoctor = doctorEntity,
            DiagnosisDate = disease.DiagnosisDate,
            Symptoms = disease.Symptoms,
            Treatment = disease.Treatment
        };
        _context.Entry(diseaseEntity.CurrentPatient).State = EntityState.Unchanged;
        _context.Entry(diseaseEntity.AttendingDoctor).State = EntityState.Unchanged;
        await _context.AddAsync(diseaseEntity);
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
       
        var diseaseEntity = await _context.Diseases
            .Include(d => d.CurrentPatient)
            .Include(d => d.AttendingDoctor)
            .FirstOrDefaultAsync(d => d.Id == disease.Id)
            ?? throw new Exception("Disease not found");

        diseaseEntity.Name = disease.Name;
        diseaseEntity.DiagnosisDate = disease.DiagnosisDate;
        diseaseEntity.Symptoms = disease.Symptoms;
        diseaseEntity.Treatment = disease.Treatment;

        if (diseaseEntity.AttendingDoctor?.Id != disease.AttendingDoctor.Id)
        {
            var newDoctor = new DoctorEntity { Id = disease.AttendingDoctor.Id };
            _context.Attach(newDoctor);
            diseaseEntity.AttendingDoctor = newDoctor;
        }

        if (diseaseEntity.CurrentPatient?.Id != disease.CurrentPatient.Id)
        {
            var newPatient = new PatientEntity { Id = disease.CurrentPatient.Id };
            _context.Attach(newPatient);
            diseaseEntity.CurrentPatient = newPatient;
        }

        await _context.SaveChangesAsync();
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
