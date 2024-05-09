"use client";
import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-16 lg:-ml-6 md:-ml-6 sm:-ml-4 xs:-ml-14">
      <span className="flex items-center justify-center z-10 font-bold text-white lg:text-xl md:text-xl sm:text-xl xs:text-md lg:-mr-32 md:-mr-32 sm:-mr-4 xs:mr-12 xs:-mt-6 ">
        {text}
      </span>
      <img
        className="lg:w-3/4 md:w-3/4 sm:w-3/4 xs:w-1/2 lg:-ml-11 md:-ml-16 sm:-ml-36 xs:-ml-44 xs:-mt-6 "
        src="/page_title.svg"
        alt="Page Title Background"
      />
    </div>
  );
};

export default Title;
