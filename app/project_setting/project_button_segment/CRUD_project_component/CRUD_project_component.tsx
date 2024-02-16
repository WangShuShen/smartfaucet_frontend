import React from 'react';
// import { setCRUDnotification } from './service/CRUD_project_hooks'; 
import { useDispatch } from 'react-redux';
import { setNotification } from '@/app/redux/app/app';
export default function CRUD_Project_Button({ imgSrc, text }) {
    const dispatch = useDispatch();
    const handleCRUDbutton = () => {
        dispatch(setNotification("編輯Project Management"));
    };
    return (
        <button onClick={handleCRUDbutton} className="bg-white text-black font-bold text-xs justify-center rounded-lg items-center" style={{ width: '95px', height: '95px' }}>
            <img src={imgSrc} alt={text} className="w-16 h-16 ml-5 mb-1" />
            <span className="text-[#727171]">{text}</span>
        </button>
    );
}