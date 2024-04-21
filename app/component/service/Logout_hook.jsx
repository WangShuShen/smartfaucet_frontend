export async function logout(refreshToken) {
  const response = await fetch(process.env.NEXT_PUBLIC_LOGOUT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.ok) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    return "登出成功";
  } else {
    const data = await response.json();
    throw new Error(data.message || "登出失敗");
  }
}
