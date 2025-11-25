namespace MedicalHistory.API.Contracts.Responses;

public record DoctorResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string Patronymic,
    string Specialization,
    string Gender,
    DateTime BirthDate
    );

