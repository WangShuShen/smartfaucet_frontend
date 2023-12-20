// components/button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-1 py-1 my-1 font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 duration-150 w-full  text-xs sm:text-sm md:text-base"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
