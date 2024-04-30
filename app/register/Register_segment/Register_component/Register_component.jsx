import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 确保是正确的导入路径

export default function Register_Component() {
  const defaultAvatar = "/register_user_picture.png"; // 默认头像路径
  const [avatar, setAvatar] = useState(defaultAvatar); // 默认头像
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 新增状态控制密码是否显示
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result); // 将头像设置为选中的图片
      };
      reader.readAsDataURL(file);
    }
  };

  // 触发文件输入的点击事件
  const triggerFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const avatarClass =
    avatar === defaultAvatar
      ? "w-1/4 h-1/4 mx-auto mt-4"
      : "w-1/4 h-1/4 mx-auto mt-4 rounded-full";

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      alert("電子郵件是必填項。");
      return;
    } else if (!password.trim() || !confirmPassword.trim()) {
      alert("密碼和確認新密碼都是必填項。");
      return;
    } else if (password !== confirmPassword) {
      alert("密碼與確認密碼不匹配，請重新輸入。");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files[0]) {
      formData.append("picture", fileInput.files[0]);
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_Signup_API, {
        method: "POST",
        headers: {
          // 不推荐这样做，因为这可能导致问题
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
        body: formData, // 注意，我们不设置 'Content-Type': 'multipart/form-data'，浏览器会自动设置
      });
      if (!response.ok) {
        response.json().then((data) => {
          console.error("注册失败:", data.message); // 假设后端返回了具体的错误消息
          alert("注册失败: " + data.message);
        });
      }

      console.log("Registration successful");
      alert("註冊成功！");
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("錯誤: " + error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto p-4 bg-white w-full h-full">
      <div className="flex items-end space-x-2 ">
        <img src="/register_logo.svg" alt="T.A.P. Logo" className="" />
        <div className="text-blue-950 text-xl font-extrabold">註冊帳號</div>
      </div>
      <div className="text-center">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <img
          src={avatar}
          alt="T.A.P. Logo"
          className={avatarClass}
          onClick={triggerFileInputClick}
        />
        <div
          className="text-center text-gray-300 font-bold mt-1 cursor-pointer"
          onClick={triggerFileInputClick}
        >
          新增頭像
        </div>
      </div>
      <form onSubmit={handleRegisterSubmit} className="flex flex-col ">
        <div className="flex items-center mt-8">
          <img src="/register_user.svg" alt="User" className="mr-2" />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="輸入帳號或電子郵件"
            className="min-w-0 flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none sm:text-sm md:text-md lg:text-lg"
          />
        </div>
        <div className="flex items-center mt-4">
          <img src="/register_pwd.svg" alt="Verification" className="mr-2" />
          <div className="min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="新密碼"
              className="min-w-0 p-2 font-semibold focus:outline-non sm:text-sm md:text-md lg:text-lg"
            />
            <img
              src="/register_pwd_eye.svg"
              alt="Verification"
              className="mr-2 cursor-pointer"
              onClick={toggleShowPassword}
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <img src="/register_pwd2.svg" alt="Verification" className="mr-2" />
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
          className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-16"
          onClick={handleRegisterSubmit}
        >
          註冊
        </button>
      </form>
    </div>
  );
}
