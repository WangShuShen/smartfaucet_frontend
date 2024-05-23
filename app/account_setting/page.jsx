"use client";
import React, { useState, useEffect, useRef } from "react";
import { createApiClient } from "@/utils/apiClient";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
async function fetchSelfAPI() {
  try {
    const apiUrl = "member/SelfManager/retrieve";
    const postApiClient = createApiClient("post", apiUrl);

    const payload = {};
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function fetchSelfProfileAPI() {
  try {
    const apiUrl = "member/SelfManager/picture";
    const getApiClient = createApiClient("get", apiUrl);
    const response = await getApiClient(apiUrl, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function updateSelfProfileAPI(file) {
  try {
    const apiUrl = "member/SelfManager/update";
    const postApiClient = createApiClient("post", apiUrl);
    const formData = new FormData();
    formData.append("picture", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await postApiClient(apiUrl, formData, config);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}

async function updateSelfPasswordAPI({ old_string, new_string }) {
  try {
    const apiUrl = "member/SelfManager/update_password";
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { old_password: old_string, new_password: new_string };
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
export default function Account_Setting_Page() {
  const [useremail, setUseremail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    const response = await fetchSelfAPI();
    const profile_response = await fetchSelfProfileAPI();
    setProfile(profile_response);
    setUseremail(response.email);
  }
  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert("Original password or new password cannot be empty!");
      return;
    }

    try {
      await updateSelfPasswordAPI({
        old_string: oldPassword,
        new_string: newPassword,
      });
      alert("Password update success.");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`error: ${error.response.data.message}`);
      } else {
        alert("An unknown error occurred while updating the password.");
      }
    }
    loadData();
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileSelect = (event) => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files[0]) {
      const imageUrl = URL.createObjectURL(fileInput.files[0]);
      setProfile(imageUrl);
      updateSelfProfileAPI(fileInput.files[0]);
    }
    loadData();
  };
  const lang = useLang();
  const languageData = useLanguage("account_setting", lang);
  if (!languageData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-start h-screen">
        <div className="container mx-auto p-4 bg-white lg:w-[40%] md:w-[40%] sm:w-[60%] xs:w-[80%] lg:h-[70%] md:h-[100%] sm:h-[100%] xs:h-[100%] rounded-lg">
          <div className="text-[#02253C] text-3xl font-semibold my-16 flex justify-center">
            {languageData.top}
          </div>
          <div className="flex flex-col items-center w-full lg:px-40 md:px-5 sm:px-0 xs:px-0 -mt-12">
            <div className="relative">
              <img
                src={profile || "/member_setting/default_profile.svg"}
                alt="Profile"
                className="rounded-full"
                style={{ width: "100px", height: "100px" }}
              />
              <button
                className="absolute bottom-0 right-0 p-2 bg-[#118BBB] rounded-full"
                onClick={triggerFileInput}
              >
                <img src="/account_setting/edit.svg" alt="Edit Icon" />
              </button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
          <form className="flex flex-col items-center w-full lg:px-40 md:px-5 sm:px-0 xs:px-0 lg:mt-5 md:mt-15">
            <div className="w-full flex items-center justify-start pl-4">
              <img src="/register_user.svg" alt="User" className="mr-2" />
              <span className="font-[#02253C] font-bold">{useremail}</span>
            </div>
            <div className="flex items-center justify-start w-full pl-4 mt-2">
              <img
                src="/register_pwd.svg"
                alt="Verification"
                className="mr-2"
              />
              <div className="flex-1 border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder={languageData.origin_password}
                  className="p-2 font-semibold focus:outline-none -ml-2"
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
              <img
                src="/confirm.svg"
                alt="Verification"
                className="-ml-1 mr-2"
              />
              <div className="flex-1 border-b-2 border-neutral-500 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={languageData.new_password}
                  className="p-2 font-semibold focus:outline-none -ml-2"
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
              onClick={handleNewPasswordSubmit}
              type="submit"
              className="bg-[#0096CA] text-white font-semibold text-xl rounded-lg p-2 mt-12 w-[80%]"
            >
              {languageData.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
