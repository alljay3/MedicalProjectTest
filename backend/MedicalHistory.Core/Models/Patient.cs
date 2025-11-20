namespace MedicalHistory.Core.Models;

public class Patient
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public List<Disease> Diseases { get; set; } = new List<Disease>();

    public Patient(Guid patientId, string firstName, string lastName, string patronymic, string gender, DateTime birthDate, List<Disease> diseases)
    {
        Id = patientId;
        FirstName = firstName;
        LastName = lastName;
        Patronymic = patronymic;
        Gender = gender;
        BirthDate = birthDate;
        Diseases = diseases;
    }

    public static Patient Create(Guid patientId, string firstName, string lastName, string patronymic, string gender, DateTime birthDate, List<Disease> diseases)
    {
        return new Patient(patientId, firstName, lastName, patronymic, gender, birthDate, diseases);
    }
}
