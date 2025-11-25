namespace MedicalHistory.Persistance.Entities;

public class DiseaseEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public PatientEntity? CurrentPatient { get; set; }

    public DoctorEntity? AttendingDoctor { get; set; }
    public string Symptoms { get; set; } = string.Empty;
    public string Treatment { get; set; } = string.Empty;
    public DateTime DiagnosisDate { get; set; }
}
