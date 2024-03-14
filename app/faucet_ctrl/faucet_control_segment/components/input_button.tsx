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
    console.log("Input Value:", inputValue);
  };

  return (
    <div className="p-4 flex flex-col h-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
      <label htmlFor="input-button" className="flex-1 block text-lg font-bold text-stone-600 mb-2">{label}</label>
      <div className="flex-2 flex flex-row h-full border-2 border-slate-300  ">
        <input
          id="input-button"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-2 sm:px-0.5 md:px-1.5 lg:px-2.5 py-2 sm:py-0.5 md:py-1 lg:py-2 text-xs sm:text-xxs md:xs lg:text-sm"
        />
        <button
          onClick={handleSubmit}
          className=" w-20 bg-white text-stone-600 font-bold px-2 sm:px-0.5 md:px-1.5 lg:px-2.5 py-2 sm:py-0.5 md:py-1 lg:py-2 text-xs sm:text-xxs md:xs lg:text-sm "
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