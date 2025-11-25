namespace MedicalHistory.Core.Models;

public class Doctor
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }

    public Doctor(Guid doctorId, string firstName, string lastName, string patronymic, string specialization, string gender, DateTime birthDate)
    {
        Id = doctorId;
        FirstName = firstName;
        LastName = lastName;
        Patronymic = patronymic;
        Specialization = specialization;
        Gender = gender;
        BirthDate = birthDate;
    }

    public static Doctor Create(Guid doctorId, string firstName, string lastName, string patronymic, string specialization, string gender, DateTime birthDate)
    {
        return new Doctor(doctorId, firstName, lastName, patronymic, specialization, gender, birthDate);
    }
}
