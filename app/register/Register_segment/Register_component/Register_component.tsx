import React, { useState } from 'react';

export default function Register_Component() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 新增状态控制密码是否显示

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        if (!username.trim()) {
            console.log('電子郵件是必填項');
            alert('電子郵件是必填項。');
            // 在这里可以设置错误状态并显示错误消息
            return;
        }
        else if (!password.trim() || !confirmPassword.trim()) {
            console.log('密碼和確認新密碼都是必填項');
            alert('密碼和確認新密碼都是必填項。');
            return;
        }
        else if (password !== confirmPassword) {
            // 如果密码不匹配，显示一个警告消息并直接返回，不继续执行后续代码
            alert('密碼與確認密碼不匹配，請重新輸入。');
            return;
        }

        console.log('New password set for username');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container mx-auto p-4 bg-white w-full h-full">
            <div className="flex items-end space-x-2 ">
                <img src="/register_logo.svg" alt="T.A.P. Logo" className="" />
                <div className="text-blue-950 text-xl font-extrabold">
                    註冊帳號
                </div>
            </div>
            <img src="/register_user_picture.png" alt="T.A.P. Logo" className="w-1/4 h-auto mx-auto mt-4" />
            <div className='text-center text-gray-300 font-bold mt-1'>新增頭像</div>
            <form onSubmit={handleRegisterSubmit} className="flex flex-col ">
                <div className="flex items-center mt-8" >
                    <img src="/register_user.svg" alt="User" className="mr-2"/>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="輸入帳號或電子郵件"
                        className="flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none"
                    />
                </div>
                <div className="flex items-center mt-4">
                    <img src="/register_pwd.svg" alt="Verification" className="mr-2"/>
                    <div className='flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="新密碼"
                            className="p-2 font-semibold focus:outline-none"
                        />
                        <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2 cursor-pointer" onClick={toggleShowPassword}/>
                    </div>
                </div>
                <div className="flex items-center mt-4">
                    <img src="/register_pwd2.svg" alt="Verification" className="mr-2"/>
                    <div className='flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="再次輸入新密碼"
                            className="p-2 font-semibold focus:outline-none"
                        />
                        <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2 cursor-pointer" onClick={toggleShowPassword}/>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-16">
                    註冊
                </button>
            </form>
        </div>
    );
}
