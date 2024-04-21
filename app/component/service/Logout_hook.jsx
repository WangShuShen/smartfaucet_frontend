export async function logout(refreshToken) {
    const response = await fetch('http://34.92.110.239:34749/api/0.1/member/SignInManager/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
  
    if (response.ok) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      return '登出成功';
    } else {
      const data = await response.json();
      throw new Error(data.message || '登出失敗');
    }
  }