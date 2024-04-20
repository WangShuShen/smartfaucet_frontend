/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import AnimatedLink from "./animations/AnimatedUnderlineLink";
import AnimatedMenu from "./animations/AnimatedMenu";
import AnimatedAccountSetting from "./animations/AnimatedAccountSetting";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-10 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <nav className="navbar-bg-gradient shadow-lg relative z-20 w-full ">
        <div className="flex justify-between items-center h-full px-4 w-full">
          <div className="flex items-center">
            <button
              className="outline-none mobile-menu-button mx-2"
              onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            >
              <img
                className="w-full xs:h-6 sm:h-6 md:h-8 lg:h-8"
                src="/hamburger_icon.svg"
                alt="hamburger_icon"
              />
            </button>
            <Link href="/">
              <button className="outline-none mobile-menu-button mx-2">
                <img
                  className="w-auto xs:h-10 sm:h-8 md:h-12 lg:h-12"
                  src="/home_icon.svg"
                  alt="home_icon"
                />
              </button>
            </Link>
            {/* Website Logo */}
            <Link href="/">
              <button className="flex items-center py-4 px-4">
                <img
                  className="w-auto xs:h-8 sm:h-8 md:h-12 lg:h-12"
                  src="/logo.svg"
                  alt="logo"
                />
              </button>
            </Link>
          </div>

          <div className="relative flex items-center">
            {" "}
            <img
              src="/human_photo.jpg"
              className="rounded-full w-10 h-10 z-12"
              alt="human_photo"
            />
            <Link href="/login">
              <button className="btn bg-sky-200 hover:bg-sky-600 px-4 py-2 rounded-full font-bold z-10 w-24 lg:text-lg md:text-md sm:text-sm xs:text-xs">
                登出
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatedMenu isOpen={isOpen}>
          <div className="my-20 overflow-y-auto max-h-200">
            <AnimatedLink href="/">專案設定</AnimatedLink>
            <AnimatedLink href="/faucet_ctrl">水龍頭控制狀態</AnimatedLink>
            <AnimatedLink href="/water_carbon_data">
              用水和碳排數據
            </AnimatedLink>
            <AnimatedLink href="/member_setting">系統人員設定資訊</AnimatedLink>
            <AnimatedAccountSetting href="/account_setting">
              帳號設定
            </AnimatedAccountSetting>
          </div>
        </AnimatedMenu>
      </nav>
    </>
  );
};

export default Navbar;
