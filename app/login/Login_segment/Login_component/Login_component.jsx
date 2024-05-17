"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "./service/Login_hook";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
export default function Login_Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState("login");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();
  const lang = useLang();

  const languageData = useLanguage("login", lang);

  if (!languageData) {
    return <div>Loading...</div>;
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("使用者名稱和密碼都是必填項。");
      return;
    }
    try {
      const data = await login(username, password);

      // 將用戶導向到項目設置頁面，並攜帶 access token
      router.push(`/project_setting`);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  const handleForgotPasswordClick = () => {
    setCurrentStep("forgotPassword");
    router.push("/login?step=forgotPassword");
    setShowPassword(false);
  };

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      alert("電子郵件是必填項。");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_Send_Temp_Password_API,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (!response.ok) {
        throw new Error("無法發送臨時密碼。");
      }

      const data = await response.json();

      alert("臨時密碼已發送至您的電子郵件。");
      // 假設下一步是輸入驗證碼
      setCurrentStep("verification");
      router.push("/login?step=verification");
    } catch (error) {
      console.error("Error:", error);
      alert("錯誤: " + error.message);
    }
  };

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    if (!verification.trim()) {
      alert("臨時密碼是必填項。");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_Send_Verify_Temp_Password_API,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            temp_password: verification,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("臨時密碼驗證失敗");
      }

      const data = await response.json();
      setAccessToken(data.access);
      alert("臨時密碼驗證成功！");
      setCurrentStep("newPassword");
      router.push("/login?step=newPassword");
      setShowPassword(false);
    } catch (error) {
      console.error("Error:", error);
      alert("錯誤: " + error.message);
    }
  };

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert("新密碼和確認新密碼都是必填項。");
      return;
    } else if (newPassword !== confirmPassword) {
      alert("新密碼與確認密碼不匹配，請重新輸入。");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_Update_Password_API,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("更新密碼失敗，請稍後再試。");
      }

      alert("密碼已成功更新！");

      setCurrentStep("login");
      router.push("/login");
      setUsername("");
      setPassword("");
      setVerification("");
      setNewPassword("");
      setConfirmPassword("");
      setEmail("");
      setShowPassword(false);
    } catch (error) {
      console.error("Error:", error);
      alert("錯誤: " + error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // 根據currentStep顯示不同的界面
  switch (currentStep) {
    case "login":
      return (
        <div className="container mx-auto p-4 bg-white w-full h-full">
          <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
          <div className="text-blue-950 text-2xl font-semibold my-16">
            {languageData.login_to_continue}
          </div>
          <form onSubmit={handleLoginSubmit} className="flex flex-col ">
            <div className="flex items-center mt-4">
              <img src="/register_user.svg" alt="User" className="mr-2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={languageData.input_email}
                className="min-w-0 flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none sm:text-sm md:text-md lg:text-lg"
              />
            </div>
            <div className="flex items-center mt-2">
              <img src="/register_pwd.svg" alt="Lock" className="mr-2" />
              <div className="min-w-0 flex-1 border-b-2 border-neutral-500 flex items-center justify-between ">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={languageData.input_password}
                  className="min-w-0 p-2 font-semibold focus:outline-none min-w-0 sm:text-sm md:text-md lg:text-lg"
                />
                <img
                  src="/register_pwd_eye.svg"
                  alt="Verification"
                  className="mr-2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="whitespace-nowrap text-sm text-neutral-500 border-b-2 border-neutral-500"
                >
                  {languageData.forget_password}
                </button>
              </div>
            </div>
            {/* <div className="flex items-center ">
                            <img src="/register_captcha.svg" alt="Verification" className="mr-2"/>
                            <div className='flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                                <input
                                    type="text"
                                    value={verification}
                                    onChange={(e) => setVerification(e.target.value)}
                                    placeholder="輸入下方驗證碼"
                                    className="p-2 font-semibold focus:outline-none"
                                />
                                <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2"/>
                            </div>
                            
                        </div> */}
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-8"
            >
              {languageData.login}
            </button>
            <div className="flex justify-between mt-4">
              <a
                href="/register"
                className="text-blue-950 text-xl font-bold my-3 mx-auto"
              >
                {languageData.register}
              </a>
            </div>
          </form>
        </div>
      );
    case "forgotPassword":
      return (
        <div className="container mx-auto p-4 bg-white w-full h-full">
          <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
          <div className="text-blue-950 text-2xl font-extrabold my-16">
            {languageData.forget_password}
          </div>
          <form
            onSubmit={handleForgotPasswordSubmit}
            className="flex flex-col "
          >
            <div className="flex items-center ">
              <img
                src="/register_forget_pwd_email.svg"
                alt="Verification"
                className="mr-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="輸入電子信箱獲取臨時密碼"
                className="min-w-0 flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none sm:text-sm md:text-md lg:text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-12"
            >
              送出
            </button>
          </form>
        </div>
      );
    case "verification":
      return (
        <div className="container mx-auto p-4 bg-white w-full h-full">
          <img src="/register_logo.svg" alt="T.A.P. Logo" className="mb-4" />
          <div className="text-blue-950 text-2xl font-extrabold my-16">
            輸入臨時密碼登入
          </div>
          <form onSubmit={handleVerificationSubmit} className="flex flex-col ">
            <div className="flex items-center ">
              <img
                src="/register_captcha.svg"
                alt="Verification"
                className="mr-2"
              />
              <div className="min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={verification}
                  onChange={(e) => setVerification(e.target.value)}
                  placeholder="請輸入密碼"
                  className="min-w-0 p-2 font-semibold focus:outline-none sm:text-sm md:text-md lg:text-lg"
                />
                <img
                  src="/register_pwd_eye.svg"
                  alt="Verification"
                  className="mr-2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-12"
            >
              下一步
            </button>
          </form>
        </div>
      );
    case "newPassword":
      return (
        <div className="container mx-auto p-4 bg-white w-full h-full">
          <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
          <div className="text-blue-950 text-2xl font-extrabold my-16">
            重新設定密碼
          </div>
          <form onSubmit={handleNewPasswordSubmit} className="flex flex-col ">
            <div className="flex items-center ">
              <img
                src="/register_pwd.svg"
                alt="Verification"
                className="mr-2"
              />
              <div className="min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="新密碼"
                  className="min-w-0 p-2 font-semibold focus:outline-none sm:text-sm md:text-md lg:text-lg"
                />
                <img
                  src="/register_pwd_eye.svg"
                  alt="Verification"
                  className="mr-2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/register_pwd2.svg"
                alt="Verification"
                className="mr-2"
              />
              <div className="min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次輸入新密碼"
                  className="min-w-0 p-2 font-semibold focus:outline-none sm:text-sm md:text-md lg:text-lg"
                />
                <img
                  src="/register_pwd_eye.svg"
                  alt="Verification"
                  className="mr-2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleNewPasswordSubmit}
              className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-12"
            >
              送出
            </button>
          </form>
        </div>
      );
  }
}
