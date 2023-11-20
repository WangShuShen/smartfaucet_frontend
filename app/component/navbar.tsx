"use client";
import React, { useState } from "react";
import Images from "next/image";
import { motion } from "framer-motion";
import AnimatedLink from "./animations/AnimatedUnderlineLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay when menu is open */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-10 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <nav className="custom-gradient shadow-lg relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Images
                src="/hamburger_icon.svg"
                width={20}
                height={20}
                alt="hamburgerbutton"
              />
            </button>

            {/* Website Logo */}
            <a href="" className="flex items-center py-4 px-4">
              <span className="font-semibold text-gray-500 text-lg">Logo</span>
            </a>

            {/* Space for future navbar items */}
            <div className="flex-grow"></div>

            {/* Placeholder for future navbar items */}
            {/* <div className="hidden">
                            Your other navbar items here
                        </div> */}
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-1/5 h-full bg-white shadow-md ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="my-20">
            {/* <motion.div
              className="underline-animation"
              variants={underlineVariants}
              initial="initial"
              whileHover="hover"
            >
              <a
                href=""
                className="font-semibold block py-2 my-7 mx-4 text-lg "
              >
                專案設定
              </a>
            </motion.div>
            <a href="" className="font-semibold block py-2 my-7 mx-4 text-lg ">
              水龍頭專案設定
            </a>
            <a href="" className="font-semibold block py-2 my-7 mx-4 text-lg ">
              用水量及碳排數據
            </a>
            <a href="" className="font-semibold block py-2 my-7 mx-4 text-lg ">
              系統人員設定資訊
            </a> */}
            <AnimatedLink href="#home">
                {/* <a>123</a> */}
                123
            </AnimatedLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
