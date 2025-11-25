using MedicalHistory.Core.Models;

namespace MedicalHistory.API.Contracts.Requests;

public record DiseaseRequest
(
    string Name,
    Guid CurrentPatient,
    Guid AttendingDoctor,
    string Symptoms,
    string Treatment,
    DateTime DiagnosisDate
    );
