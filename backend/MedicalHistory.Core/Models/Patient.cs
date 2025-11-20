namespace MedicalHistory.Core.Models;

public class Patient
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }

    public Patient(Guid patientId, string firstName, string lastName, string patronymic, string gender, DateTime birthDate)
    {
        Id = patientId;
        FirstName = firstName;
        LastName = lastName;
        Patronymic = patronymic;
        Gender = gender;
        BirthDate = birthDate;
    }

    public static Patient Create(Guid patientId, string firstName, string lastName, string patronymic, string gender, DateTime birthDate)
    {
        return new Patient(patientId, firstName, lastName, patronymic, gender, birthDate);
    }
}
