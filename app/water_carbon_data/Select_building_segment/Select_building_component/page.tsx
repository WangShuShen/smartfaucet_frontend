"use client";
import React, { useState } from 'react';

// 假定這是一組可選的建築物名稱
const buildingOptions = [
    { value: 'building1', label: '台積電A棟' },
    { value: 'building2', label: '台積電B棟' },
    { value: 'building3', label: '台積電C棟' },
    // 根據需要添加更多建築物
];

export default function SelectBuildingComponent() {
    const [selectedBuilding, setSelectedBuilding] = useState(buildingOptions[0].value);

    return (
        <div className='flex justify-end items-center'>
            <span>已設置完成的 </span>
            <select className="bg-white border border-blue-900 border-2 text-sky-700 rounded-md ml-5 mr-10 px-2" 
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
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
