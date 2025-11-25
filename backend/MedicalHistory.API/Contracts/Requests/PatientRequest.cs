namespace MedicalHistory.API.Contracts.Requests;

public record PatientRequest
(
    Guid Id,
    string FirstName,
    string LastName,
    string Patronymic,
    string Gender,
    DateTime BirthDate
);
