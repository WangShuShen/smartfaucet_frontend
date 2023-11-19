'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="custom-gradient shadow-lg relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Mobile menu button always visible */}
                    <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
                        <>
                            <Image src='/hamberger_icon.svg' width={20} height={20} />
                        </>

                    </button>

                    {/* Website Logo */}
                    <a href="" className="flex items-center py-4 px-10">
                        <span className="font-semibold text-gray-500 text-lg">Logo</span>
                    </a>

                    {/* Placeholder for other navbar items, hidden in all screen sizes */}
                    {/* <div className="hidden">
                        Your other navbar items here
                    </div> */}
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`absolute top-full left-0 w-full bg-white ${isOpen ? 'block' : 'hidden'}`}>
                <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
                <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Services</a>
                <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">About</a>
                <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact Us</a>
            </div>
        </nav>
    );
};

export default Navbar;
