import React from 'react';

export default function Project_managerment_Component({ imgSrc, text }) {
    return (
        <div class='flex flex-col justify-end px-2'>
            <button className="bg-slate-200 text-black font-bold text-xs justify-center rounded-lg  items-center" style={{ width: '90px', height: '80px' }}>
                <img src={imgSrc} alt={text} className="w-14 h-14 ml-5 mb-1" />
                <span>{text}</span>
            </button>
        </div>
    );
}
