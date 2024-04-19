"use client";
import React, { useState } from 'react';
import Select_building_Segment from './Select_building_segment/Select_building_segment';
import Water_carbon_data_Segment from './Water_carbon_data_segment/Water_carbon_data_segment';
import Figure_Segment from './Figure_segment/Figure_segment';

export default function Water_carbon_data_Page() {
    const [selectedBuildingId, setSelectedBuildingId] = useState('building1');
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col w-11/12 justify-end items-center ' >
                <Select_building_Segment onBuildingSelect={setSelectedBuildingId}/>
                <div className='flex flex-col bg-white rounded-t-3xl h-fit w-full'>
                    <Water_carbon_data_Segment />
                    <Figure_Segment buildingId={selectedBuildingId}/>
                </div>
            </div>
        </div>


    );
}
