// components/input_button.tsx
import React, { useState, ChangeEvent } from 'react';

interface InputButtonProps {
  label: string;
  placeholder?: string;
  buttonText: string;
}

const InputButton: React.FC<InputButtonProps> = ({ label, placeholder, buttonText }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // 處理提交邏輯
    console.log("Input Value:", inputValue);
  };

  return (
    <div className="p-4 flex flex-col h-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
      <label htmlFor="input-button" className="flex-1 block text-lg font-bold text-stone-600 mb-2">{label}</label>
      <div className="flex-2 flex flex-row h-full border-2 border-slate-300 ">
        <input
          id="input-button"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-grow px-2 py-1 text-xs sm:text-sm md:text-sm"
        />
        <button
          onClick={handleSubmit}
          className=" w-12 bg-white text-stone-600 font-bold p-r-2 text-xs sm:text-sm md:text-base "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InputButton;

<div>
  <div></div>
  <div>
    <div></div>
    <div></div>
  </div>
</div>