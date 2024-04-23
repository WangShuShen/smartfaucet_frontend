"use client";
import React, { useState } from 'react';

// 假定這是一組可選的建築物名稱
const buildingOptions = [
    { value: 'building1', label: '台積電A棟' },
    { value: 'building2', label: '台積電B棟' },
    { value: 'building3', label: '台積電C棟' },
    // 根據需要添加更多建築物
];

export default function SelectBuildingComponent({ onBuildingSelect }) {
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const handleChange = (e) => {
        setSelectedBuilding(e.target.value);
        onBuildingSelect(e.target.value); // 這裡調用了從父組件傳入的回調函數
    };
    return (
        <div className='flex justify-end items-center mt-1 mb-4 w-full '>
            <span className='text-sky-800 font-semibold'>已設置完成的 </span>
            <select 
                className="bg-white border border-blue-900 border-2 text-sky-700 font-semibold rounded-md ml-5 px-2 py-0.5" 
                value={selectedBuilding}
                onChange={handleChange}
            >
                {buildingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
