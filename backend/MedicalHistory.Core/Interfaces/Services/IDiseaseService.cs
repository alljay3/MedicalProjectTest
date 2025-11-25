using MedicalHistory.Core.Models;

namespace MedicalHistory.Core.Interfaces.Services;
public interface IDiseaseService
{
    Task<Guid> CreateDisease(Disease disease);
    Task<Guid> DeleteDisease(Guid id);
    Task<List<Disease>> GetAllDiseases();
    Task<Disease> GetDisease(Guid id);
    Task<Guid> UpdateDisease(Disease disease);
}