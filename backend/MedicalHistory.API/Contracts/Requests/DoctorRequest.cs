namespace MedicalHistory.API.Contracts.Requests;

public record DoctorRequest
(
    string FirstName,
    string LastName,
    string Patronymic,
    string Specialization,
    string Gender,
    DateTime BirthDate);
