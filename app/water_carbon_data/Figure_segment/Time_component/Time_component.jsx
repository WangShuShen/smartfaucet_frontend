import React from 'react';

export default function TimeOptionComponent({ onTimeChange }) {
  const options = [
    { label: '周', value: 'week' },
    { label: '月', value: 'month' },
    { label: '年', value: 'year' }
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
