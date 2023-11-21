"use client";
import React, { useState } from "react";
import Images from "next/image";
import AnimatedLink from "./animations/AnimatedUnderlineLink";
import AnimatedMenu from "./animations/AnimatedMenu";
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

      <nav className="custom-gradient shadow-lg relative z-20 h-16">
        <div className="flex justify-between items-center h-full px-4">
          {/* 將漢堡按鈕和Logo放在同一個容器內 */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="outline-none mobile-menu-button mx-2"
              onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            >
              <Images
                src="/hamburger_icon.svg"
                width={20}
                height={20}
                alt="hamburger_button"
              />
            </button>
            <button
              className="outline-none mobile-menu-button mx-2"
              onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            >
              <Images
                src="/icon__home.svg"
                width={30}
                height={30}
                alt="hamburger_button"
              />
            </button>
            {/* Website Logo */}
            <a href="" className="flex items-center py-4 px-4">
              {/* <span className="font-semibold text-gray-500 text-lg">Logo</span> */}
              <Images
                src="/logo.svg"
                width={100}
                height={50}
                alt="home_button"
                priority="1"
              />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatedMenu isOpen={isOpen}>
          <div className="my-20">
            {/* 可以在這裡添加Mobile Menu的連結 */}
            <AnimatedLink href="">專案設定</AnimatedLink>
            <AnimatedLink href="">水龍頭控制狀態</AnimatedLink>
            <AnimatedLink href="">用水和碳排數據</AnimatedLink>
            <AnimatedLink href="">系統人員設定資訊</AnimatedLink>
          </div>
        </AnimatedMenu>
      </nav>
    </>
  );
};

export default Navbar;
