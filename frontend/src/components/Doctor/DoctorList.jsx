import React from 'react';

const DoctorList = ({ doctors, onEdit, onDelete }) => {
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

  if (doctors.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-person-x display-4 text-muted"></i>
          <h5 className="mt-3">Докторы не найдены</h5>
          <p className="text-muted">Попробуйте изменить параметры фильтра</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-list">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Список докторов</h5>
          <span className="badge bg-primary">{doctors.length} докторов</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ФИО</th>
                  <th>Специализация</th>
                  <th>Пол</th>
                  <th>Дата рождения</th>
                  <th>Возраст</th>
                  <th width="150">Действия</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doctor => (
                  <tr key={doctor.id}>
                    <td>
                      <strong>{`${doctor.lastName} ${doctor.firstName} ${doctor.patronymic}`}</strong>
                    </td>
                    <td>
                      <span className="badge bg-primary">{doctor.specialization}</span>
                    </td>
                    <td>{doctor.gender}</td>
                    <td>{formatDate(doctor.birthDate)}</td>
                    <td>
                      <span className="badge bg-secondary">{calculateAge(doctor.birthDate)} лет</span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(doctor)}
                          title="Редактировать"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(doctor.id)}
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

export default DoctorList;