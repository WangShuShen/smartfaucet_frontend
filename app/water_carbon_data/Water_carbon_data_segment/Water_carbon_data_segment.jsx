"use client";
import React from 'react';
import Usage from './Usage_component/Usage_component';

export default function Water_carbon_data_Segment() {
    return (
        <div className='w-full flex justify-center items-center space-x-10 py-4 mb-5 bg-custom-cyan rounded-t-2xl shadow-md shadow-gray-950'>
            <div className='w-1/4'>
                <Usage topText="總流水量" bottomText="7666GPM" ></Usage>
            </div>
            <div className='w-1/4'>
                <Usage topText="總用省水量" bottomText="4561GPM"></Usage>
            </div>
            
            
        </div>
    );
}
