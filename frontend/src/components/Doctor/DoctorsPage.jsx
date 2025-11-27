
import React, { useState, useEffect } from 'react';
import DoctorService from '../../services/doctorService';
import DoctorForm from './DoctorForm';
import DoctorList from './DoctorList';
import DoctorFilter from './DoctorFilter';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [specializationFilter, setSpecializationFilter] = useState('');

  useEffect(() => {
    loadAllDoctors();
  }, []);

  useEffect(() => {
    if (specializationFilter) {
      filterDoctorsBySpecialization(specializationFilter);
    } else {
      setDoctors(allDoctors);
    }
  }, [specializationFilter, allDoctors]);

  const loadAllDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await DoctorService.getAllDoctors();
      setAllDoctors(data);
      setDoctors(data);
    } catch (err) {
      setError('Ошибка при загрузке докторов');
      console.error('Error loading doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctorsBySpecialization = async (spec) => {
    if (!spec.trim()) {
      setDoctors(allDoctors);
      return;
    }

    setLoading(true);
    try {
      if (allDoctors.length > 0) {
        const filtered = allDoctors.filter(doctor => 
          doctor.specialization.toLowerCase().includes(spec.toLowerCase())
        );
        setDoctors(filtered);
      } else {
        const data = await DoctorService.getDoctorsBySpecialization(spec);
        setDoctors(data);
      }
    } catch (err) {
      setError('Ошибка при фильтрации докторов');
      console.error('Error filtering doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDoctor = async (doctorData) => {
    try {
      await DoctorService.createDoctor(doctorData);
      setShowForm(false);
      await loadAllDoctors();
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
      await loadAllDoctors();
    } catch (err) {
      setError('Ошибка при обновлении доктора');
      console.error('Error updating doctor:', err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого доктора?')) {
      try {
        await DoctorService.deleteDoctor(id);
        await loadAllDoctors();
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
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Управление докторами</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Добавить доктора
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError('')}
              ></button>
            </div>
          )}

          <div className="card mb-4">
            <div className="card-body">
              <DoctorFilter
                specialization={specializationFilter}
                onSpecializationChange={setSpecializationFilter}
                doctors={allDoctors}
              />
            </div>
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
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-2">Загрузка докторов...</p>
            </div>
          ) : (
            <DoctorList
              doctors={doctors}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;