"use client";
import { createApiClient } from "@/utils/apiClient";
export async function logout(refreshToken) {
  const client = createApiClient("post", process.env.NEXT_PUBLIC_LOGOUT_API);

  try {
    const response = await client("", { refresh: refreshToken }); // 使用客户端发送请求

    if (response.status === 200) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      return "登出成功";
    } else {
      throw new Error("登出失败");
    }
  } catch (error) {
    console.error("Logout Error:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(errorMessage || "登出失败");
  }
}
