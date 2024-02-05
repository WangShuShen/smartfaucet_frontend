"use client";
import React from 'react';
import Project_button_Segment from './project_button_segment/Project_button_segment';\nimport 4_Segment from './4_segment/4_segment';\nimport State_Segment from './State_segment/State_segment';\n

export default function Project_setting_Page() {
    return (
        <div className='block'>
            <Project_button_Segment />\n<4_Segment />\n<State_Segment />\n
        </div>
    );
}
