import React from 'react';

export default function CRUD_Project_Button({ imgSrc, text }) {
    return (
        <button className="bg-white text-black font-bold text-xs justify-center rounded-lg  items-center" style={{ width: '95px', height: '95px' }}>
            <img src={imgSrc} alt={text} className="w-16 h-16 ml-5 mb-1" />
            <span>{text}</span>
        </button>
    );
}