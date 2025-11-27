import React, { useState, useEffect } from 'react';

const DoctorForm = ({ doctor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    specialization: '',
    gender: 'Мужской',
    birthDate: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        patronymic: doctor.patronymic,
        specialization: doctor.specialization,
        gender: doctor.gender,
        birthDate: doctor.birthDate.split('T')[0] // Format for date input
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert date string to DateTime
    const submitData = {
      ...formData,
      birthDate: new Date(formData.birthDate).toISOString()
    };
    
    onSubmit(submitData);
  };

  const isFormValid = formData.firstName && 
                     formData.lastName && 
                     formData.specialization && 
                     formData.birthDate;

  return (
    <div className="doctor-form-overlay">
      <div className="doctor-form">
        <h2>{doctor ? 'Редактировать доктора' : 'Добавить доктора'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Фамилия *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Имя *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Отчество</label>
            <input
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Специализация *</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Пол</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          </div>

          <div className="form-group">
            <label>Дата рождения *</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!isFormValid}
            >
              {doctor ? 'Обновить' : 'Создать'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;