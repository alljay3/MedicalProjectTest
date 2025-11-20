using System.Reflection.Metadata;

namespace MedicalHistory.Core.Models;

public class Disease
{
    public Guid DiseaseId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public string Symptoms { get; set; } = string.Empty;
    public string Treatment { get; set; } = string.Empty;
    public DateTime DiagnosisDate { get; set; }

    public Disease(Guid diseaseId, string name, int patientId, int doctorId, string symptoms, string treatment, DateTime diagnosisDate)
    {
        DiseaseId = diseaseId;
        Name = name;
        PatientId = patientId;
        DoctorId = doctorId;
        Symptoms = symptoms;
        Treatment = treatment;
        DiagnosisDate = diagnosisDate;
    }

    public static Disease Create(Guid diseaseId, string name, int patientId, int doctorId, string symptoms, string treatment, DateTime diagnosisDate)
    {
        return new Disease(diseaseId, name, patientId, doctorId, symptoms, treatment, diagnosisDate);
    }
}