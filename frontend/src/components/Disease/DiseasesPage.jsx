import React, { useState, useEffect } from 'react';
import DiseaseService from '../../services/diseaseService';
import DiseaseForm from './DiseaseForm';
import DiseaseList from './DiseaseList';

const DiseasesPage = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDisease, setEditingDisease] = useState(null);

  // Загружаем все заболевания при монтировании
  useEffect(() => {
    loadAllDiseases();
  }, []);

  const loadAllDiseases = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await DiseaseService.getAllDiseases();
      setDiseases(data);
    } catch (err) {
      setError('Ошибка при загрузке заболеваний');
      console.error('Error loading diseases:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDisease = async (diseaseData) => {
    try {
      await DiseaseService.createDisease(diseaseData);
      setShowForm(false);
      await loadAllDiseases();
    } catch (err) {
      setError('Ошибка при создании заболевания');
      console.error('Error creating disease:', err);
    }
  };

  const handleUpdateDisease = async (id, diseaseData) => {
    try {
      await DiseaseService.updateDisease(id, diseaseData);
      setEditingDisease(null);
      setShowForm(false);
      await loadAllDiseases();
    } catch (err) {
      setError('Ошибка при обновлении заболевания');
      console.error('Error updating disease:', err);
    }
  };

  const handleDeleteDisease = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это заболевание?')) {
      try {
        await DiseaseService.deleteDisease(id);
        await loadAllDiseases();
      } catch (err) {
        setError('Ошибка при удалении заболевания');
        console.error('Error deleting disease:', err);
      }
    }
  };

  const handleEditDisease = (disease) => {
    setEditingDisease(disease);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingDisease(null);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Управление заболеваниями</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Добавить заболевание
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

          {showForm && (
            <DiseaseForm
              disease={editingDisease}
              onSubmit={editingDisease ? 
                (data) => handleUpdateDisease(editingDisease.id, data) : 
                handleCreateDisease
              }
              onCancel={handleCancelForm}
            />
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-2">Загрузка заболеваний...</p>
            </div>
          ) : (
            <DiseaseList
              diseases={diseases}
              onEdit={handleEditDisease}
              onDelete={handleDeleteDisease}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseasesPage;