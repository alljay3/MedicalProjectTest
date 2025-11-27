import React, { useState, useEffect } from 'react';
import PatientService from '../../services/patientService';
import DoctorService from '../../services/doctorService';

const DiseaseForm = ({ disease, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    currentPatient: '',
    attendingDoctor: '',
    symptoms: '',
    treatment: '',
    diagnosisDate: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatientsAndDoctors();
  }, []);

  useEffect(() => {
    if (disease) {
      setFormData({
        name: disease.name,
        currentPatient: disease.currentPatient.id,
        attendingDoctor: disease.attendingDoctor.id,
        symptoms: disease.symptoms,
        treatment: disease.treatment,
        diagnosisDate: disease.diagnosisDate.split('T')[0]
      });
    }
  }, [disease]);

  const loadPatientsAndDoctors = async () => {
    setLoading(true);
    try {
      const [patientsData, doctorsData] = await Promise.all([
        PatientService.getAllPatients(),
        DoctorService.getAllDoctors()
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (err) {
      console.error('Error loading patients and doctors:', err);
    } finally {
      setLoading(false);
    }
  };

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Название обязательно';
    }
    
    if (!formData.currentPatient) {
      newErrors.currentPatient = 'Пациент обязателен';
    }
    
    if (!formData.attendingDoctor) {
      newErrors.attendingDoctor = 'Лечащий врач обязателен';
    }
    
    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Симптомы обязательны';
    }
    
    if (!formData.diagnosisDate) {
      newErrors.diagnosisDate = 'Дата диагноза обязательна';
    } else {
      const diagnosisDate = new Date(formData.diagnosisDate);
      const today = new Date();
      if (diagnosisDate > today) {
        newErrors.diagnosisDate = 'Дата диагноза не может быть в будущем';
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
      diagnosisDate: new Date(formData.diagnosisDate).toISOString()
    };
    
    onSubmit(submitData);
  };

  const formatPersonName = (person) => {
    return `${person.lastName} ${person.firstName} ${person.patronymic}`;
  };

  return (
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {disease ? 'Редактировать заболевание' : 'Добавить заболевание'}
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
                    <label className="form-label">Название заболевания *</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Дата диагноза *</label>
                    <input
                      type="date"
                      name="diagnosisDate"
                      className={`form-control ${errors.diagnosisDate ? 'is-invalid' : ''}`}
                      value={formData.diagnosisDate}
                      onChange={handleChange}
                    />
                    {errors.diagnosisDate && (
                      <div className="invalid-feedback">{errors.diagnosisDate}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Пациент *</label>
                    <select
                      name="currentPatient"
                      className={`form-select ${errors.currentPatient ? 'is-invalid' : ''}`}
                      value={formData.currentPatient}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Выберите пациента</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {formatPersonName(patient)}
                        </option>
                      ))}
                    </select>
                    {errors.currentPatient && (
                      <div className="invalid-feedback">{errors.currentPatient}</div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Лечащий врач *</label>
                    <select
                      name="attendingDoctor"
                      className={`form-select ${errors.attendingDoctor ? 'is-invalid' : ''}`}
                      value={formData.attendingDoctor}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Выберите врача</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {formatPersonName(doctor)} ({doctor.specialization})
                        </option>
                      ))}
                    </select>
                    {errors.attendingDoctor && (
                      <div className="invalid-feedback">{errors.attendingDoctor}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Симптомы *</label>
                    <textarea
                      name="symptoms"
                      className={`form-control ${errors.symptoms ? 'is-invalid' : ''}`}
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows="3"
                    />
                    {errors.symptoms && (
                      <div className="invalid-feedback">{errors.symptoms}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Лечение</label>
                    <textarea
                      name="treatment"
                      className="form-control"
                      value={formData.treatment}
                      onChange={handleChange}
                      rows="3"
                    />
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
                disabled={loading}
              >
                {disease ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiseaseForm;