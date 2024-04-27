"use client";
import React, { useState, useEffect } from "react";
import { createApiClient } from "@/utils/apiClient";
import Notification from "./component/Revise_Password_Notification.tsx";
class Member {
  constructor(memberData) {
    this.id = memberData.email;
    this.email = memberData.email;
    this.isActive = memberData.is_active;
    this.lastLogin = memberData.last_login;
    this.role = memberData.role;
    this.pictureUrl = memberData.picture_url || "/default_profile.svg";
  }

  get isActiveText() {
    return this.isActive ? "有效" : "無效";
  }

  get formattedLastLogin() {
    return this.lastLogin
      ? new Date(this.lastLogin).toLocaleString()
      : "從未登入";
  }

  async fetchProfileImage() {
    if (!this.pictureUrl.startsWith("http")) {
      return `/member_setting${this.pictureUrl}`;
    }

    try {
      const getApiClient = createApiClient("get", this.pictureUrl);
      const response = await getApiClient(this.pictureUrl, {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      return "/default_profile.svg";
    }
  }
}
async function fetchMemberAPI() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_MEMBERLIST_API;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = {};
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function authorizeMemberAPI(email_string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_MEMBERAUTHORIZE_API;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { email: email_string };
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function unauthorizeMemberAPI(email_string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_MEMBERUNAUTHORIZE_API;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { email: email_string };
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}

async function deleteMemberAPI(email_string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_MEMBERDELETE_API;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { email: email_string };
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
export default function Member_Setting_Page() {
  const [members, setMembers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const emptyRows = Math.max(10 - members.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);
  const [isNotification, setisNotification] = useState(false);
  useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    const response = await fetchMemberAPI();
    if (response) {
      const membersData = response.map((member) => new Member(member));
      const membersWithImages = await Promise.all(
        membersData.map(async (member) => ({
          ...member,
          pictureUrl: await member.fetchProfileImage(),
          isActiveText: member.isActiveText,
          formattedLastLogin: member.formattedLastLogin,
        }))
      );
      setMembers(membersWithImages);
    }
  }
  const handleSelectChange = (id) => {
    setSelectedId(id);
  };

  const handleAuthorize = async () => {
    if (selectedId) {
      await authorizeMemberAPI(selectedId);
      loadData();
    }
  };

  const handleUnauthorize = async () => {
    if (selectedId) {
      await unauthorizeMemberAPI(selectedId);
      loadData();
    }
  };

  const handleChangePassword = async (newPassword) => {
    setisNotification(true);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteMemberAPI(selectedId);
      loadData();
    }
  };
  const handleCloseNotification = () => {
    setisNotification(false);
  };
  return (
    <div>
      {isNotification && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Notification
            email={selectedId}
            onClose={handleCloseNotification}
          ></Notification>
        </div>
      )}
      <div className="lg:flex justify-end mb-2 xs:block sm:inline-block">
        <button
          onClick={handleAuthorize}
          className="btn lg:btn-lg xs:btn-sm bg-[#118BBB] mr-2"
          disabled={!selectedId}
        >
          授權使用者
        </button>
        <button
          onClick={handleUnauthorize}
          className="btn lg:btn-lg xs:btn-sm bg-[#118BBB] mr-2"
          disabled={!selectedId}
        >
          註銷使用者
        </button>
        <button
          onClick={handleChangePassword}
          className="btn lg:btn-lg xs:btn-sm bg-[#118BBB] mr-2"
          disabled={!selectedId}
        >
          更改密碼
        </button>
        <button
          onClick={handleDelete}
          className="btn lg:btn-lg xs:btn-sm bg-[#118BBB] mr-2"
          disabled={!selectedId}
        >
          刪除使用者
        </button>
      </div>
      <div className="flex justify-center item-center ">
        <div className="overflow-x-auto w-[100%]">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <div className="overflow-y-auto max-h-[1400px]">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 px-5 py-3 bg-[#EFEFEF] text-center text-xs text-[#5F6162] uppercase tracking-wider ${hasUpdated.company ? 'bg-[#007BFF]' : 'bg-[#EFEFEF]'} text-[#5F6162]`}">
                      選取
                    </th>
                    <th className="sticky top-0 z-10 px-5 py-3 text-start text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                      使用者帳號
                    </th>
                    <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                      狀態
                    </th>
                    <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                      上次登入時間
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#EFEFEF]">
                  {members.map((member, index) => (
                    <tr key={member.id}>
                      <td className="px-2 py-3 border-gray-200 text-sm text-center">
                        <label className="flex cursor-pointer justify-center">
                          <input
                            type="radio"
                            name="projectSelection"
                            checked={selectedId === member.id}
                            onChange={() => handleSelectChange(member.id)}
                            className="sr-only"
                          />
                          <span className="block w-4 h-4 rounded bg-[#D9D9D9] ml-0 relatives">
                            {selectedId === member?.id && (
                              <svg className="w-3 h-3" viewBox="0 0 18 24">
                                <path
                                  fill="#0C659E"
                                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                                />
                              </svg>
                            )}
                          </span>
                        </label>
                      </td>
                      <td
                        className="flex justify-start items-center px-0 py-3 border-gray-200 text-sm truncate max-w-[400px]"
                        title={member.email}
                      >
                        <div className="flex justify-center items-center">
                          <img
                            src={member.pictureUrl}
                            alt="Profile"
                            className="rounded-full h-[50px] w-[50px] mx-4"
                          />
                          <span>{member.email}</span>
                        </div>
                      </td>
                      <td
                        className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                        title={member.isActiveText}
                      >
                        {member.isActiveText}
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm text-center relative truncate max-w-[30px]">
                        {member.formattedLastLogin}
                      </td>
                    </tr>
                  ))}
                  {emptyRowsArray.map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        <input type="radio" disabled className="hidden" />
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        &nbsp;
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        &nbsp;
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        &nbsp;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
