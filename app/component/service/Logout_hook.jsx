"use client";
import { createApiClient } from "@/utils/apiClient";
export async function logout(refreshToken) {
  const client = createApiClient("post", "member/SignInManager/logout");

  try {
    const response = await client("", { refresh: refreshToken }); // 使用客户端发送请求

    if (response.status === 200) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      return "登出成功";
    } else {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
  } catch (error) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    console.error("Logout Error:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
  }
}
