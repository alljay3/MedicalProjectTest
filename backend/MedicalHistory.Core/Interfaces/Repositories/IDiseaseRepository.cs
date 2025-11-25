using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Repositories;
public interface IDiseaseRepository
{
    Task<Guid> Create(Disease disease);
    Task<Guid> Delete(Guid id);
    Task<Disease> Get(Guid id);
    Task<Guid> Update(Disease disease);
    Task<List<Disease>> GetAll();
}