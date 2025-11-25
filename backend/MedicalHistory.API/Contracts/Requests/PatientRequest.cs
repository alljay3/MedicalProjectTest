namespace MedicalHistory.API.Contracts.Requests;

public record PatientRequest
(
    string FirstName,
    string LastName,
    string Patronymic,
    string Gender,
    DateTime BirthDate
);
