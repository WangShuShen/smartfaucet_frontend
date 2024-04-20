"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProject } from "@/app/redux/project_setting/project_list";
import { selectprojectReducer } from "@/app/redux/project_setting/project_CRUD";
import { useRouter } from "next/navigation";
import axios from "axios";
async function fetchlistfaucet(hubUid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LISTUNBINDFAUCET_API;
    const response = await axios.post(apiUrl, {
      hub_uid: hubUid,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function fetchbindfaucet(location_Uid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LISTLOCATIONFAUCET_API;
    const response = await axios.post(apiUrl, {
      location_uid: location_Uid,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function bindfaucetapi(location_Uid, faucet_uid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BINDLOCATIONFAUCET_API;
    const response = await axios.post(apiUrl, {
      faucet_uid: faucet_uid,
      f_location_uid: location_Uid,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
export default function Member_Setting_Page() {
  const dispatch = useDispatch();
  const reduxProjects = useSelector((state) => state.project.projects);
  const project_CRUD = useSelector((state) => state.project_CRUD);
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const emptyRows = Math.max(10 - projects.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);

  useEffect(() => {
    dispatch(fetchProject());
  }, [project_CRUD]);

  useEffect(() => {
    const projectsWithId = reduxProjects.map((project, index) => ({
      ...project,
      id: `${project.project_company_uid}-${index}`,
    }));
    setProjects(projectsWithId);
    if (project_CRUD.selected_project === null && projects.length > 0) {
      setSelectedId(null);
    }
  }, [reduxProjects]);

  const handleSelectChange = (id) => {
    setSelectedId(id);
    const selectedProject = projects.find((project) => project.id === id);
    dispatch(selectprojectReducer(selectedProject));
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      console.log("使用者名稱和密碼都是必填項");
      alert("使用者名稱和密碼都是必填項。");
      return;
    }
    console.log("Login attempt");
    router.push("/project_setting");
  };

  const handleForgotPasswordClick = () => {
    setCurrentStep("forgotPassword");
    router.push("/login?step=forgotPassword");
    setShowPassword(false);
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      console.log("電子郵件是必填項");
      alert("電子郵件是必填項。");
      // 在这里可以设置错误状态并显示错误消息
      return;
    }
    console.log("Request temporary password for email");
    // 假設下一步是輸入驗證碼
    setCurrentStep("verification");
    router.push("/login?step=verification");
  };

  const handleVerificationSubmit = (event) => {
    event.preventDefault();
    if (!verification.trim()) {
      console.log("臨時密碼是必填項");
      alert("臨時密碼是必填項。");
      // 在这里可以设置错误状态并显示错误消息
      return;
    }
    console.log("Temporary password verification for verification");
    setCurrentStep("newPassword");
    router.push("/login?step=newPassword");
    setShowPassword(false);
  };

  const handleNewPasswordSubmit = (event) => {
    event.preventDefault();
    if (!newPassword.trim() || !confirmPassword.trim()) {
      console.log("新密碼和確認新密碼都是必填項");
      alert("新密碼和確認新密碼都是必填項。");
      return;
    } else if (newPassword !== confirmPassword) {
      // 如果密码不匹配，显示一个警告消息并直接返回，不继续执行后续代码
      alert("新密碼與確認密碼不匹配，請重新輸入。");
      return;
    }
    console.log("New password set for email");
    setCurrentStep("login");
    router.push("/login");
    setUsername("");
    setPassword("");
    setVerification("");
    setNewPassword("");
    setConfirmPassword("");
    setEmail("");
    setShowPassword(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="flex items-center justify-start h-screen">
        <div className="container mx-auto p-4 bg-white w-[40%] lg:h-[500px] md:h-[400px] sm:h-[400px] xs:h-[300px] rounded-md">
          <div className="text-[#02253C] text-3xl font-semibold my-16 flex justify-center">
            帳號設定
          </div>

          <form
            onSubmit={handleNewPasswordSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className="w-full flex items-center justify-start pl-4">
              <img src="/register_user.svg" alt="User" className="mr-2" />
              <span>123</span>
            </div>
            <div className="flex items-center justify-start w-full pl-4">
              <img
                src="/register_pwd.svg"
                alt="Verification"
                className="mr-2"
              />
              <div className="flex-1 border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="新密碼"
                  className="p-2 font-semibold focus:outline-none"
                />
                <img
                  src="/register_pwd_eye.svg"
                  alt="Verification"
                  className="mr-2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            <div className="flex items-center mt-2 justify-start w-full pl-4">
              <img src="/confirm.svg" alt="Verification" className="mr-2" />
              <div className="flex-1 border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次輸入新密碼"
                  className="p-2 font-semibold focus:outline-none"
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
              className="bg-[#0096CA] text-white font-semibold text-xl rounded-lg p-2 mt-12 w-[45%]"
            >
              送出
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
