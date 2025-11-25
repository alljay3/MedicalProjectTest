using MedicalHistory.API.Contracts.Requests;
using MedicalHistory.API.Contracts.Responces;
using MedicalHistory.API.Contracts.Responses;
using MedicalHistory.Application.Services;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MedicalHistory.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class DiseaseController : ControllerBase
{
    private readonly IDiseaseService _diseaseService;
    private readonly IDoctorService _doctorService;
    private readonly IPatientService _patientService;

    public DiseaseController(IDiseaseService diseaseService, IDoctorService doctorService, IPatientService patientService)
    {
        _diseaseService = diseaseService;
        _doctorService = doctorService;
        _patientService = patientService;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateDisease([FromBody] DiseaseRequest request)
    {
        var doctor = await _doctorService.GetDoctor(request.AttendingDoctor);
        var patient = await _patientService.GetPatient(request.CurrentPatient);
        var disease = Disease.Create(Guid.NewGuid(), request.Name, patient, doctor, request.Symptoms, request.Treatment, request.DiagnosisDate);

        var diseaseId = await _diseaseService.CreateDisease(disease);
        return Ok(diseaseId);
    }

    [HttpGet ("{id:guid}")]
    public async Task<ActionResult<DiseaseResponse>> GetDisease(Guid id)
    {
        var disease = await _diseaseService.GetDisease(id);
        var response = new DiseaseResponse(disease.Id, disease.Name, disease.CurrentPatient, disease.AttendingDoctor, disease.Symptoms, disease.Treatment, disease.DiagnosisDate);
        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<List<DiseaseResponse>>> GetAllDisease()
    {
        var disease = await _diseaseService.GetAllDiseases();
        var response = disease.Select(d => new DiseaseResponse(d.Id, d.Name, d.CurrentPatient, d.AttendingDoctor, d.Symptoms, d.Treatment, d.DiagnosisDate));
        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteDisease(Guid id)
    {
        var diseaseId = await _diseaseService.DeleteDisease(id);
        return Ok(diseaseId);
    }


    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateDisease([FromBody] DiseaseRequest request, Guid id)
    {
        var doctor = await _doctorService.GetDoctor(request.AttendingDoctor);
        var patient = await _patientService.GetPatient(request.CurrentPatient);
        var disease = Disease.Create(id, request.Name, patient, doctor, request.Symptoms, request.Treatment, request.DiagnosisDate);

        var diseaseId = await _diseaseService.UpdateDisease(disease);
        return Ok(diseaseId);
    }
}
