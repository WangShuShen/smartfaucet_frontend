import React from 'react';

export default function Top_label_Component({ text, bgColor= 'bg-transparent', textColor='text-slate-700' }) {
    return (
        <div className ={`basis-1/4 h-full ${bgColor} rounded-b-xl flex items-center justify-center`}>
            <span className ={`${textColor} text-sm font-semibold`}>{text}</span>
        </div>

    );
}
