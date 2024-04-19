"use client";
import React from 'react';
import Link from 'next/link';
import Register_Segment from './Register_segment/Register_segment';

export default function Register_Page() {
    return (
        <div className="bg-[url('/register_background.png')] bg-cover bg-center flex h-screen caret-transparent" >
            <Link href="/login">
                    <img src="/back.png" alt="Back to home" className="w-1/12 cursor-pointer absolute top-16 right-12" />
            </Link>
            <div className='flex-1'>
            </div>
            <div className='flex-1 flex justify-center items-center pt-12'>
                <div className='rounded-3xl bg-white drop-shadow-lg sm:w-72 md:w-96 lg:w-custom-width sm:h-96 md:h-custom-height lg:h-custom-height py-10 px-8'>
                    <Register_Segment />
                </div>
            </div>
            
        </div>
    );
}
