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
    return <div className="no-data">Докторы не найдены</div>;
  }

  return (
    <div className="doctor-list">
      <h2>Список докторов</h2>
      <div className="doctors-grid">
        {doctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-info">
              <h3>{`${doctor.lastName} ${doctor.firstName} ${doctor.patronymic}`}</h3>
              <p><strong>Специализация:</strong> {doctor.specialization}</p>
              <p><strong>Пол:</strong> {doctor.gender}</p>
              <p><strong>Дата рождения:</strong> {formatDate(doctor.birthDate)}</p>
              <p><strong>Возраст:</strong> {calculateAge(doctor.birthDate)} лет</p>
            </div>
            <div className="doctor-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => onEdit(doctor)}
              >
                Редактировать
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => onDelete(doctor.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;