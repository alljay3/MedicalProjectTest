using System.Reflection;
using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Models;
using MedicalHistory.Persistance.Entities;
using Microsoft.EntityFrameworkCore;

namespace MedicalHistory.Persistance.Repositories;

public class DoctorRepository : IDoctorRepository
{
    private readonly MedicalHistoryDbContext _context;

    public DoctorRepository(MedicalHistoryDbContext context)
    {
        _context = context;
    }
     
    public async Task<Guid> Create(Doctor doctor)
    {
        var doctorEntity = new DoctorEntity()
        {
            Id = doctor.Id,
            FirstName = doctor.FirstName,
            LastName = doctor.LastName,
            Patronymic = doctor.Patronymic,
            Specialization = doctor.Specialization,
            Gender = doctor.Gender,
            BirthDate = doctor.BirthDate,
        };
        await _context.AddAsync(doctorEntity);
        await _context.SaveChangesAsync();
        return doctor.Id;
    }

    public async Task<Doctor> Get(Guid id)
    {
        var doctorEntity = await _context.Doctors.AsNoTracking().FirstOrDefaultAsync(doc => doc.Id == id) ?? throw new Exception();
        return Doctor.Create(doctorEntity.Id, doctorEntity.FirstName, doctorEntity.LastName, doctorEntity.Patronymic, doctorEntity.Specialization, doctorEntity.Gender, doctorEntity.BirthDate);
    }


    public async Task<Guid> Update(Doctor doctor)
    {
         await _context.Doctors.Where(doc => doc.Id == doctor.Id)
            .ExecuteUpdateAsync(s => s
            .SetProperty(s => s.FirstName, doctor.FirstName)
            .SetProperty(s => s.LastName, doctor.LastName)
            .SetProperty(s => s.Patronymic, doctor.Patronymic)
            .SetProperty(s => s.Specialization, doctor.Specialization)
            .SetProperty(s => s.Gender, doctor.Gender)
            .SetProperty(s => s.BirthDate, doctor.BirthDate));
        return doctor.Id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _context.Doctors.Where(doc => doc.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }

    public async Task<List<Doctor>> GetAll()
    {
        var doctorEntity = await _context.Doctors.AsNoTracking().ToListAsync();
        var doctors = doctorEntity.Select(doc => Doctor.Create(doc.Id, doc.FirstName, doc.LastName, doc.Patronymic, doc.Specialization, doc.Gender, doc.BirthDate)).ToList();
        return doctors;
    }


}
