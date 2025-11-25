using MedicalHistory.Core.Models;

namespace MedicalHistory.API.Contracts.Requests;

public record DiseaseRequest
(Guid Id,
    string Name,
    Patient CurrentPatient,
    Doctor AttendingDoctor,
    string Symptoms,
    string Treatment,
    DateTime DiagnosisDate
    );
