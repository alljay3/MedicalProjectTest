import React, { useState } from 'react';
import DoctorsPage from './components/Doctor/DoctorsPage';
import PatientsPage from './components/Patient/PatientsPage';
import DiseasesPage from './components/Disease/DiseasesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [currentPage, setCurrentPage] = useState('doctors');

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Медицинская система</span>
          <div className="navbar-nav">
            <button
              className={`nav-link btn btn-link ${currentPage === 'doctors' ? 'active' : ''}`}
              onClick={() => setCurrentPage('doctors')}
            >
              Докторы
            </button>
            <button
              className={`nav-link btn btn-link ${currentPage === 'patients' ? 'active' : ''}`}
              onClick={() => setCurrentPage('patients')}
            >
              Пациенты
            </button>
            <button
              className={`nav-link btn btn-link ${currentPage === 'diseases' ? 'active' : ''}`}
              onClick={() => setCurrentPage('diseases')}
            >
              Заболевания
            </button>
          </div>
        </div>
      </nav>
      
      {currentPage === 'doctors' && <DoctorsPage />}
      {currentPage === 'patients' && <PatientsPage />}
      {currentPage === 'diseases' && <DiseasesPage />}
    </div>
  );
}

export default App;