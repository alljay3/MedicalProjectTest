import React, { useState, useEffect } from 'react';

const DoctorFilter = ({ specialization, onSpecializationChange, doctors = [] }) => {
  const [availableSpecializations, setAvailableSpecializations] = useState([]);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];
      specializations.sort();
      setAvailableSpecializations(specializations);
    } else {
      setAvailableSpecializations([]);
    }
  }, [doctors]);

  const handleSelectChange = (e) => {
    onSpecializationChange(e.target.value);
  };

  return (
    <div className="row align-items-end">
      <div className="col-md-6">
        <label className="form-label">Фильтр по специализации</label>
        <select
          className="form-select"
          value={specialization}
          onChange={handleSelectChange}
        >
          <option value="">Все специализации</option>
          {availableSpecializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        <div className="form-text">
          {availableSpecializations.length > 0 
            ? `Найдено ${availableSpecializations.length} специализаций` 
            : 'Специализации не найдены'
          }
        </div>
      </div>
    </div>
  );
};

export default DoctorFilter;