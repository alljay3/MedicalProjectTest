using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;
using Microsoft.AspNetCore.Http;
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
    public async Task<ActionResult<List<Patient>>> GetAllPatients()
    {
        _patientService.GetAllPatients();
    }

}
