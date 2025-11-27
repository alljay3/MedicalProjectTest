import React, { useState, useEffect } from 'react';
const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    gender: 'Мужской',
    birthDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.firstName,
        lastName: patient.lastName,
        patronymic: patient.patronymic,
        gender: patient.gender,
        birthDate: patient.birthDate.split('T')[0]
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Дата рождения обязательна';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthDate = 'Дата рождения не может быть в будущем';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitData = {
      ...formData,
      birthDate: new Date(formData.birthDate).toISOString()
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {patient ? 'Редактировать пациента' : 'Добавить пациента'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onCancel}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Фамилия *</label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Имя *</label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Отчество</label>
                    <input
                      type="text"
                      name="patronymic"
                      className="form-control"
                      value={formData.patronymic}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Пол</label>
                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Мужской">Мужской</option>
                      <option value="Женский">Женский</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Дата рождения *</label>
                    <input
                      type="date"
                      name="birthDate"
                      className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                    {errors.birthDate && (
                      <div className="invalid-feedback">{errors.birthDate}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Отмена
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                {patient ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;