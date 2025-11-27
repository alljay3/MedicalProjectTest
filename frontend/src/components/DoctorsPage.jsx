import React, { useState, useEffect } from 'react';
import DoctorService from '../services/doctorService';
import DoctorForm from './DoctorForm';
import DoctorList from './DoctorList';
import DoctorFilter from './DoctorFilter';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [specializationFilter, setSpecializationFilter] = useState('');

  useEffect(() => {
    loadDoctors();
  }, [specializationFilter]);

  const loadDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (specializationFilter) {
        data = await DoctorService.getDoctorsBySpecialization(specializationFilter);
      } else {
        data = await DoctorService.getAllDoctors();
      }
      setDoctors(data);
    } catch (err) {
      setError('Ошибка при загрузке докторов');
      console.error('Error loading doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDoctor = async (doctorData) => {
    try {
      await DoctorService.createDoctor(doctorData);
      setShowForm(false);
      loadDoctors();
    } catch (err) {
      setError('Ошибка при создании доктора');
      console.error('Error creating doctor:', err);
    }
  };

  const handleUpdateDoctor = async (id, doctorData) => {
    try {
      await DoctorService.updateDoctor(id, doctorData);
      setEditingDoctor(null);
      setShowForm(false);
      loadDoctors();
    } catch (err) {
      setError('Ошибка при обновлении доктора');
      console.error('Error updating doctor:', err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого доктора?')) {
      try {
        await DoctorService.deleteDoctor(id);
        loadDoctors();
      } catch (err) {
        setError('Ошибка при удалении доктора');
        console.error('Error deleting doctor:', err);
      }
    }
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingDoctor(null);
  };

  return (
    <div className="doctors-page">
      <h1>Управление докторами</h1>
      
      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="controls">
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Добавить доктора
        </button>
        
        <DoctorFilter
          specialization={specializationFilter}
          onSpecializationChange={setSpecializationFilter}
        />
      </div>

      {showForm && (
        <DoctorForm
          doctor={editingDoctor}
          onSubmit={editingDoctor ? 
            (data) => handleUpdateDoctor(editingDoctor.id, data) : 
            handleCreateDoctor
          }
          onCancel={handleCancelForm}
        />
      )}

      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <DoctorList
          doctors={doctors}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
        />
      )}
    </div>
  );
};

export default DoctorsPage;