"use client";
import React from 'react';
import Select_building_Segment from './Select_building_segment/Select_building_segment';\nimport Water_carbon_data_Segment from './Water_carbon_data_segment/Water_carbon_data_segment';\nimport Figure_Segment from './Figure_segment/Figure_segment';\n

export default function Water_carbon_data_Page() {
    return (
        <div className='block'>
            <Select_building_Segment />\n<Water_carbon_data_Segment />\n<Figure_Segment />\n
        </div>
    );
}
