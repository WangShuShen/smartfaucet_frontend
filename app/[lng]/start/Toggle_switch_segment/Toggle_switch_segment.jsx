// Toggle_switch_Segment.js
"use client";
import React from 'react';
import Toggle_switch from './Toggle_switch_component/Toggle_switch_component';

export default function Toggle_switch_Segment({ onToggle }) {
    return (
        <div className='flex'>
            <Toggle_switch onToggle={onToggle} />
        </div>
    );
}
