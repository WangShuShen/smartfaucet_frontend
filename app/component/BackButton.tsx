"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back(); // 調用此函數以返回上一頁
  };
  return (
    <div className="flex hover:cursor-pointer" onClick={handleBack}>
      <img src="/backbutton_icon.svg" className="mr-2"></img>
      <div className="text-[#118BBB] mr-2">Back</div>
    </div>
  );
};

export default BackButton;
