"use client";
import React from 'react';
import Select_building from './Select_building_component/Select_building_component';

export default function Select_building_Segment({ onBuildingSelect }) {
    return (
        <div className='flex justify-end items-center w-full'>
            <Select_building onBuildingSelect={onBuildingSelect}/>
        </div>
    );
}
