using MedicalHistory.API.Contracts.Requests;
using MedicalHistory.API.Contracts.Responces;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace MedicalHistory.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PatientController : ControllerBase
{
    private readonly IPatientService _patientService;

    public PatientController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PatientResponse>>> GetAllPatients()
    {
        var patients = await _patientService.GetAllPatients();
        var response = patients.Select(p => new PatientResponse(p.Id, p.FirstName, p.LastName, p.Patronymic, p.Gender, p.BirthDate));
        return Ok(response);
    }
    [HttpGet("{id:guid}")] 
    public async Task<ActionResult<PatientResponse>> GetPatients(Guid id)
    {
        var patient = await _patientService.GetPatient(id);
        var response = new PatientResponse(patient.Id, patient.FirstName, patient.LastName, patient.Patronymic, patient.Gender, patient.BirthDate);
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreatePatient([FromBody] PatientRequest request)
    {
        var patient = Patient.Create(Guid.NewGuid(),
            request.FirstName, request.LastName, request.Patronymic, request.Gender, request.BirthDate);
        
        var patientId = await _patientService.CreatePatient(patient);
        return Ok(patientId);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeletePatient(Guid id)
    {
        var patientId = await _patientService.DeletePatient(id);
        return Ok(patientId);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdatePatient([FromBody] PatientRequest request, Guid id)
    {
        var patient = Patient.Create(id,
            request.FirstName, request.LastName, request.Patronymic, request.Gender, request.BirthDate);

        var patientId = await _patientService.UpdatePatient(patient);
        return Ok(patientId);
    }







}
