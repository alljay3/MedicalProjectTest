import React from 'react';

const DoctorFilter = ({ specialization, onSpecializationChange }) => {
  const commonSpecializations = [
    'Терапевт',
    'Хирург',
    'Кардиолог',
    'Невролог',
    'Педиатр',
    'Офтальмолог',
    'Дерматолог'
  ];

  return (
    <div className="doctor-filter">
      <label>Фильтр по специализации:</label>
      <select
        value={specialization}
        onChange={(e) => onSpecializationChange(e.target.value)}
      >
        <option value="">Все специализации</option>
        {commonSpecializations.map(spec => (
          <option key={spec} value={spec}>{spec}</option>
        ))}
        <option value="other">Другая...</option>
      </select>
      
      {specialization === 'other' && (
        <input
          type="text"
          placeholder="Введите специализацию"
          onChange={(e) => onSpecializationChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default DoctorFilter;