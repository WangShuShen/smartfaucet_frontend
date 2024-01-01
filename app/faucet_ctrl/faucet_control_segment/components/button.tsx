// components/button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className=" my-1 font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 duration-150 w-full  px-2 sm:px-0.5 md:px-1.5 lg:px-2.5 py-2 sm:py-0.5 md:py-1 lg:py-2 text-xs sm:text-xxs md:xs lg:text-sm"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
