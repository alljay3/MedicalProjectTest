import React from 'react';

const DiseaseList = ({ diseases, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const formatPatientName = (patient) => {
    return `${patient.lastName} ${patient.firstName} ${patient.patronymic}`;
  };

  const formatDoctorName = (doctor) => {
    return `${doctor.lastName} ${doctor.firstName} ${doctor.patronymic}`;
  };

  if (diseases.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-clipboard-x display-4 text-muted"></i>
          <h5 className="mt-3">Заболевания не найдены</h5>
          <p className="text-muted">Добавьте первое заболевание</p>
        </div>
      </div>
    );
  }

  return (
    <div className="disease-list">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Список заболеваний</h5>
          <span className="badge bg-primary">{diseases.length} заболеваний</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Название</th>
                  <th>Пациент</th>
                  <th>Лечащий врач</th>
                  <th>Симптомы</th>
                  <th>Лечение</th>
                  <th>Дата диагноза</th>
                  <th width="150">Действия</th>
                </tr>
              </thead>
              <tbody>
                {diseases.map(disease => (
                  <tr key={disease.id}>
                    <td>
                      <strong>{disease.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {formatPatientName(disease.currentPatient)}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {formatDoctorName(disease.attendingDoctor)}
                      </span>
                    </td>
                    <td>
                      <small>{disease.symptoms}</small>
                    </td>
                    <td>
                      <small>{disease.treatment}</small>
                    </td>
                    <td>{formatDate(disease.diagnosisDate)}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(disease)}
                          title="Редактировать"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(disease.id)}
                          title="Удалить"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseList;