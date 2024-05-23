export async function login(email, password) {
  const response = await fetch(
    `${process.env.PROTOCAL}://${process.env.HOST}:${process.env.API_PORT}/${process.env.API_ROOT}/${process.env.API_VERSION}/member/SignInManager/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();
  if (response.ok) {
    // 儲存 token 至 localStorage
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("accessToken", data.access);

    return data;
  } else {
    throw new Error(data.message || "無法登入");
  }
}
