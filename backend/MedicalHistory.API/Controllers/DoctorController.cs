using MedicalHistory.API.Contracts.Requests;
using MedicalHistory.API.Contracts.Responses;
using MedicalHistory.Core.Interfaces.Services;
using MedicalHistory.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace MedicalHistory.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class DoctorController : ControllerBase
{
    private readonly IDoctorService _doctorService;

    public DoctorController(IDoctorService doctorService)
    {
        _doctorService = doctorService;
    }


    [HttpGet("spec/{spec}")]
    public async Task<ActionResult<List<DoctorResponse>>> GetDoctorsBySpecialization(string spec)
    {
        var doctors = await _doctorService.GetDoctorsBySpecialization(spec);
        var response = doctors.Select(p => new DoctorResponse(p.Id, p.FirstName, p.LastName, p.Patronymic,p.Specialization, p.Gender, p.BirthDate));
        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<List<DoctorResponse>>> GetAllDoctors()
    {
        var doctors = await _doctorService.GetAllDoctors();
        var response = doctors.Select(p => new DoctorResponse(p.Id, p.FirstName, p.LastName, p.Patronymic, p.Specialization, p.Gender, p.BirthDate));
        return Ok(response);
    }


    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DoctorResponse>> GetDoctor(Guid id)
    {
        var doctor = await _doctorService.GetDoctor(id);
        var response = new DoctorResponse(doctor.Id, doctor.FirstName, doctor.LastName, doctor.Patronymic, doctor.Specialization, doctor.Gender, doctor.BirthDate);
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateDoctor([FromBody] DoctorRequest request)
    {
        var doctor = Doctor.Create(Guid.NewGuid(),
            request.FirstName, request.LastName, request.Patronymic,request.Specialization, request.Gender, request.BirthDate);

        var doctorId = await _doctorService.CreateDoctor(doctor);
        return Ok(doctorId);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteDoctor(Guid id)
    {
        var doctorId = await _doctorService.DeleteDoctor(id);
        return Ok(doctorId);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateDoctor([FromBody] DoctorRequest request, Guid id)
    {
        var doctor = Doctor.Create(id,
            request.FirstName, request.LastName, request.Patronymic, request.Specialization, request.Gender, request.BirthDate);

        var doctorId = await _doctorService.UpdateDoctor(doctor);
        return Ok(doctorId);
    }





}
