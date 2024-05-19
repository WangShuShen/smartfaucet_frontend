import React from 'react';
import withLanguage from './../../service/withLanguage';

const TimeOptionComponent = ({ onTimeChange, languageData }) => {
  const options = [
    { label: languageData.select.week, value: 'week' },
    { label: languageData.select.month, value: 'month' },
    { label: languageData.select.year, value: 'year' }
  ];

  return (
    <div className="flex ml-8 justify-normal">
      {options.map(({ label, value }) => (
        <p
          key={value}
          className="mr-20 cursor-pointer font-bold"
          onClick={() => onTimeChange(value)}
        >
          {label}
        </p>
      ))}
    </div>
  );
}

export default withLanguage(TimeOptionComponent);
