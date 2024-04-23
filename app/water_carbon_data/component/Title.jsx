"use client";
import React from "react";

const Title = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-16 lg:-ml-6 md:-ml-6 sm:-ml-8 xs:-ml-14">
      <span className="flex items-center justify-center z-10 font-bold text-white lg:text-xl md:text-xl sm:text-xl xs:text-sm lg:-mr-34 md:-mr-28 sm:-mr-20 xs:ml-0 xs:-mt-6 ">
        {text}
      </span>
      <img
        className="lg:w-3/4 md:w-3/4 sm:w-3/4 xs:w-1/2 lg:-ml-10 md:-ml-10 sm:-ml-16 xs:-ml-28 xs:-mt-6 "
        src="/page_title.svg"
        alt="Page Title Background"
      />
    </div>
  );
};

export default Title;
