"use client";
import React from 'react';
import Link from 'next/link';
import Login_Segment from './Login_segment/Login_segment';

export default function Login_Page() {
    return (
        <div className="bg-[url('/login_background.png')] bg-cover bg-center flex h-screen caret-transparent" >
            <Link href="/start">
                    <img src="/back_home.svg" alt="Back to home" className="cursor-pointer absolute top-20 right-4" />
            </Link>
            <div className='flex-1 flex justify-center items-center pt-12'>
                <div className='rounded-3xl bg-white drop-shadow-lg py-10 px-8 h-auto'>
                    <Login_Segment />
                </div>
            </div>
            <div className='flex-1'>
            </div>
        </div>
    );
}
