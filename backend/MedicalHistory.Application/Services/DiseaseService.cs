using MedicalHistory.Core.Interfaces.Repositories;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;

namespace MedicalHistory.Application.Services;

public class DiseaseService : IDiseaseService
{
    private readonly IDiseaseRepository _diseaseRepository;

    public DiseaseService(IDiseaseRepository diseaseRepository)
    {
        _diseaseRepository = diseaseRepository;
    }

    public async Task<Guid> CreateDisease(Disease disease)
    {
        return await _diseaseRepository.Create(disease);
    }

    public async Task<Guid> UpdateDisease(Disease disease)
    {
        return await _diseaseRepository.Update(disease);
    }

    public async Task<Guid> DeleteDisease(Guid id)
    {
        return await _diseaseRepository.Delete(id);
    }

    public async Task<Disease> GetDisease(Guid id)
    {
        var disease = await _diseaseRepository.Get(id);
        return disease;
    }

    public async Task<List<Disease>> GetAllDiseases()
    {
        return await _diseaseRepository.GetAll();
    }

}
