using System.Reflection.Metadata;

namespace MedicalHistory.Core.Models;

public class Disease
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Patient CurrentPatient { get; set; }
    public Doctor AttendingDoctor { get; set; }
    public string Symptoms { get; set; } = string.Empty;
    public string Treatment { get; set; } = string.Empty;
    public DateTime DiagnosisDate { get; set; }

    public Disease(Guid diseaseId, string name, Patient currentPatient, Doctor attendingDoctor, string symptoms, string treatment, DateTime diagnosisDate)
    {
        Id = diseaseId;
        Name = name;
        CurrentPatient = currentPatient;
        AttendingDoctor = attendingDoctor;
        Symptoms = symptoms;
        Treatment = treatment;
        DiagnosisDate = diagnosisDate;
    }

    public static Disease Create(Guid diseaseId, string name, Patient currentPatient, Doctor attendingDoctor, string symptoms, string treatment, DateTime diagnosisDate)
    {
        return new Disease(diseaseId, name, currentPatient, attendingDoctor, symptoms, treatment, diagnosisDate);
    }
}