// // Time_component.tsx
// import React, { useState } from 'react';

// export default function TimeOption_Component() {
//   const [selectedOption, setSelectedOption] = useState<string>('周');

//   const handleChange = (option: string) => {
//     setSelectedOption(option);
//     // 如果您有基於選擇改變的進一步邏輯，可以在這裡實現
//   };

//   return (
//     <div className="flex ml-8 justify-normal">
//       {['周', '月', '年'].map((option) => (
//         <p
//           key={option}
//           className={`mr-20 cursor-pointer font-bold ${selectedOption === option ? "text-[#118BBB]" : ""}`}
//           onClick={() => handleChange(option)}
//         >
//           {option}
//         </p>
//       ))}
//     </div>
//   );
// }


import React from 'react';

interface TimeOptionComponentProps {
  onTimeChange: (timeFrame: string) => void;
}

export default function TimeOptionComponent({ onTimeChange }: TimeOptionComponentProps) {
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
