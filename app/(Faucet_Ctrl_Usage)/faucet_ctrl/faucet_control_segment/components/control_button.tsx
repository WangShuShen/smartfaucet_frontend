// components/faucet_control_segment.tsx
import { useState } from 'react';

interface ButtonOption {
  label: string;
  value: string;
}

interface ControlButtonProps {
  options: ButtonOption[];
  segmentTitle?: string; // Optional prop for the segment title
}

export default function ControlButton({ options, segmentTitle }: ControlButtonProps) {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className="p-4">
      {segmentTitle && <h2 className="text-stone-600 text-lg font-bold mb-2">{segmentTitle}</h2>}
      <div className="flex divide-x divide-transparent">
        {options.map((option, index) => (
          <button
            key={option.value}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              selected === option.value
                ? 'text-stone-600'
                : 'text-stone-600'
            } ${
              index === 0 ? 'rounded-l-lg' : index === options.length - 1 ? 'rounded-r-lg' : ''
            } ${index === 0 ? 'rounded-r-none' : index === options.length - 1 ? 'rounded-l-none' : 'rounded-none'
            }`}
            onClick={() => setSelected(option.value)}
            style={{ margin: '0 2px',backgroundColor: selected === option.value ? '#81c0c0' : '#d0d0d0', }} // 添加水平间隔
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
