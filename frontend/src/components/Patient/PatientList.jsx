import React from 'react';

const PatientList = ({ patients, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  if (patients.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-person-x display-4 text-muted"></i>
          <h5 className="mt-3 text-unselectable">Пациенты не найдены</h5>
          <p className="text-muted text-unselectable">Добавьте первого пациента</p>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-list">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0 text-unselectable">Список пациентов</h5>
          <span className="badge bg-primary text-unselectable">{patients.length} пациентов</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-unselectable">ФИО</th>
                  <th className="text-unselectable">Пол</th>
                  <th className="text-unselectable">Дата рождения</th>
                  <th className="text-unselectable">Возраст</th>
                  <th width="150" className="text-unselectable">Действия</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id}>
                    <td>
                      <div className="text-unselectable">
                        {`${patient.lastName} ${patient.firstName} ${patient.patronymic}`}
                      </div>
                    </td>
                    <td className="text-unselectable">{patient.gender}</td>
                    <td className="text-unselectable">{formatDate(patient.birthDate)}</td>
                    <td>
                      <span className="badge bg-secondary text-unselectable">
                        {calculateAge(patient.birthDate)} лет
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(patient)}
                          title="Редактировать"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(patient.id)}
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

export default PatientList;