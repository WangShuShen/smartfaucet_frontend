"use client";
import React from 'react';
import Login_Segment from './Login_segment/Login_segment';

export default function Login_Page() {
    return (
        <div className="bg-[url('/login_background.png')] bg-cover bg-center flex h-screen" >
            <div className='flex-1 flex justify-center items-center'>
                <div className='rounded-3xl bg-white drop-shadow-lg py-12 px-8'>
                    <Login_Segment />
                </div>
            </div>
            <div className='flex-1'>
            </div>
        </div>
    );
}
