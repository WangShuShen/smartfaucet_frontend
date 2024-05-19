"use client";
import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="relative inline-flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: 'url("/page_title.svg")' }}>
      <span className="text-white text-center font-bold lg:text-xl md:text-xl sm:text-xl xs:text-sm mr-5">
        {text}
      </span>
    </div>
  );
};

export default Title;
