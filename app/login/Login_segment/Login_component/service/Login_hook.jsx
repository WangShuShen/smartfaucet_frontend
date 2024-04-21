
export async function login(email, password) {
  const response = await fetch('http://34.92.110.239:34749/api/0.1/member/SignInManager/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    // 儲存 token 至 localStorage
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('accessToken', data.access);

    return data;
  } else {
    throw new Error(data.message || '無法登入');
  }
}
