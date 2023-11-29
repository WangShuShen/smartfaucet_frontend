"use client";
import React from "react";

// 定義Props的類型
interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  // 注意這裡使用了tailwindcss的flexbox類別來實現水平和垂直居中
  return (
    <div className="flex items-center justify-center h-16 lg:-ml-6 md:-ml-6 sm:-ml-4 xs:-ml-14">
      <span className="flex items-center justify-center z-10 font-bold text-white lg:text-xl md:text-xl sm:text-xl xs:text-lg lg:-mr-28 md:-mr-28 sm:-mr-28 xs:-ml-0 xs:-mt-6 ">
        {text}
      </span>
      <img
        className="lg:w-3/4 md:w-3/4 sm:w-3/4 xs:w-1/2 lg:ml-0 md:ml-0 sm:ml-0 xs:-ml-24 xs:-mt-6 "
        src="/page_title.svg"
        alt="Page Title Background"
      />
    </div>
  );
};

export default Title;
