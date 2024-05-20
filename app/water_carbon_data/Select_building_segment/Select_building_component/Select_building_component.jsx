"use client";
import React, { useState, useEffect } from 'react';
import { createApiClient } from "@/utils/apiClient";  // 確保路徑正確
import withLanguage from "./../../service/withLanguage";

const SelectBuildingComponent = ({ onBuildingSelect, languageData }) => {
    const [buildingOptions, setBuildingOptions] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');

    useEffect(() => {
        const client = createApiClient('post', process.env.NEXT_PUBLIC_List_Two_Layer_API); 
        client('', {}) 
        .then(response => {
            const buildings = response.data.map(item => ({
                value: item.building_uid,
                label: item.two_layer_name
            }));
            setBuildingOptions(buildings);
            if (buildings.length > 0) {
                setSelectedBuilding(buildings[0].value);
                onBuildingSelect(buildings[0].value);
            }
        })
        .catch(error => console.error('Error fetching buildings:', error));
    }, [onBuildingSelect]);

    const handleChange = (e) => {
        setSelectedBuilding(e.target.value);
        onBuildingSelect(e.target.value); // 將building uid傳遞給父節點
    };

    return (
        <div className='flex justify-end items-center mt-1 mb-4 w-full'>
            <span className='text-sky-800 font-semibold'>{languageData.select.completed_setup}</span>
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

export default withLanguage(SelectBuildingComponent);
