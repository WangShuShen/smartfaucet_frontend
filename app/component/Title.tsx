'use client';
import React from 'react';

// 定義Props的類型
interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  // 注意這裡使用了tailwindcss的flexbox類別來實現水平和垂直居中
  return (
    <div className="relative flex items-center h-20">
      <div className="fixed absolute inset-0 bg-page-title lg:w-1/3 md:w-1/2 sm:w-1/2" />
      <span className="ml-12 z-10 text-xl font-bold text-white justify-self-center">{text}</span>
    </div>
  );
};

export default Title;