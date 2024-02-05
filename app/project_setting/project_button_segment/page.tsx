"use client";
import React from 'react';
import CRUD_Project_Button from './CRUD_project_component/CRUD_project_component'; 
import Search_engine_Component from './Search_engine_component/Search_engine_component';
import Project_managerment_Component from './Project_managerment_component/Project_managerment_component';


export default function Project_button_Segment() {
    const Create_Project_Data = [
        { imgSrc: '/project_setting_create_company.svg', text: '專案/公司' },
        { imgSrc: '/project_setting_create_building.svg', text: '任務/建築物' },
    ];
    const Delete_Project_Data = [
        { imgSrc: '/project_setting_delete_company.svg', text: '專案/公司' },
        { imgSrc: '/project_setting_delete_building.svg', text: '任務/建築物' },
    ];

    const Project_Managerment_Data = [
        { imgSrc: '/project_setting_save.svg', text: '儲存' },
        { imgSrc: '/project_setting_edit.svg', text: '編輯任務/建築物' },
        { imgSrc: '/project_setting_copy.svg', text: '複製' },
    ];

    return (
        <div className='flex justify-between px-20'>
            <Search_engine_Component />
            <div class="w-64 h-40 bg-gradient-to-b from-sky-500 to-sky-300 rounded-xl flex flex-col" >
                <div class="basis-1/4 flex items-center justify-center">
                    <p class="text-white font-bold">新增 +</p>
                </div>
                <div class="basis-3/4 justify-center items-center">
                    <div class="flex justify-between items-center w-full px-6">
                        {Create_Project_Data.map((button, index) => (
                            <CRUD_Project_Button key={index} imgSrc={button.imgSrc} text={button.text} />
                        ))}
                    </div>
                </div>
            </div>

            <div class="w-64 h-40 bg-gradient-to-b from-slate-500 to-slate-300 rounded-xl flex flex-col" >
                <div class="basis-1/4 flex items-center justify-center">
                    <p class="text-white font-bold">刪除 X</p>
                </div>
                <div class="basis-3/4 justify-center items-center">
                    <div class="flex justify-between items-center w-full px-6">
                        {Delete_Project_Data.map((button, index) => (
                            <CRUD_Project_Button key={index} imgSrc={button.imgSrc} text={button.text} />
                        ))}
                    </div>
                </div>
            </div>
            <div class="flex flex-row" >
                {Project_Managerment_Data.map((button, index) => (
                    <Project_managerment_Component key={index} imgSrc={button.imgSrc} text={button.text} />
                ))}
            </div> 
            
        </div>
    );
}
