import React, { useState, useEffect } from 'react';
import PatientService from '../../services/patientService';
import PatientForm from './PatientForm';
import PatientList from './PatientList';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  // Загружаем всех пациентов при монтировании
  useEffect(() => {
    loadAllPatients();
  }, []);

  const loadAllPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await PatientService.getAllPatients();
      setPatients(data);
    } catch (err) {
      setError('Ошибка при загрузке пациентов');
      console.error('Error loading patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (patientData) => {
    try {
      await PatientService.createPatient(patientData);
      setShowForm(false);
      await loadAllPatients();
    } catch (err) {
      setError('Ошибка при создании пациента');
      console.error('Error creating patient:', err);
    }
  };

  const handleUpdatePatient = async (id, patientData) => {
    try {
      await PatientService.updatePatient(id, patientData);
      setEditingPatient(null);
      setShowForm(false);
      await loadAllPatients();
    } catch (err) {
      setError('Ошибка при обновлении пациента');
      console.error('Error updating patient:', err);
    }
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пациента?')) {
      try {
        await PatientService.deletePatient(id);
        await loadAllPatients();
      } catch (err) {
        setError('Ошибка при удалении пациента');
        console.error('Error deleting patient:', err);
      }
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0 text-unselectable">Управление пациентами</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Добавить пациента
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <span className="text-unselectable">{error}</span>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError('')}
              ></button>
            </div>
          )}

          {showForm && (
            <PatientForm
              patient={editingPatient}
              onSubmit={editingPatient ? 
                (data) => handleUpdatePatient(editingPatient.id, data) : 
                handleCreatePatient
              }
              onCancel={handleCancelForm}
            />
          )}

          {loading ? (
            <div className="text-center py-5 text-unselectable">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-2">Загрузка пациентов...</p>
            </div>
          ) : (
            <PatientList
              patients={patients}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;