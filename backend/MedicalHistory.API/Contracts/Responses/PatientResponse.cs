namespace MedicalHistory.API.Contracts.Responces;

public record PersonResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string Patronymic,
    string Gender,
    DateTime BirthDate
);
