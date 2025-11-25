namespace MedicalHistory.API.Contracts.Requests;

public record DoctorRequest
(Guid Id,
    string FirstName,
    string LastName,
    string Patronymic,
    string Specialization,
    string Gender,
    DateTime BirthDate);
