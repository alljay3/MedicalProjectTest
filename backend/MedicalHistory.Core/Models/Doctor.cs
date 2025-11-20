namespace MedicalHistory.Core.Models;

public class Doctor
{
    public Guid DoctorId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public List<Disease> Diseases { get; set; } = new List<Disease>();

    public Doctor(Guid doctorId, string firstName, string lastName, string patronymic, string specialization, string gender, DateTime birthDate, List<Disease> diseases)
    {
        DoctorId = doctorId;
        FirstName = firstName;
        LastName = lastName;
        Patronymic = patronymic;
        Specialization = specialization;
        Gender = gender;
        BirthDate = birthDate;
        Diseases = diseases;
    }

    public static Doctor Create(Guid doctorId, string firstName, string lastName, string patronymic, string specialization, string gender, DateTime birthDate, List<Disease> diseases)
    {
        return new Doctor(doctorId, firstName, lastName, patronymic, specialization, gender, birthDate, diseases);
    }
}
