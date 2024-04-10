import React, { useState } from 'react';

export default function Login_Component() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verification, setVerification] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // 实现登录逻辑
        console.log('Login attempt with:', { username, password, verification });
    };

    return (
        <div className="container mx-auto p-4 bg-white w-full h-full">
            
            <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
            <div className="text-blue-950 text-3xl font-bold my-16">
                登入以繼續
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex items-center " >
                    <img src="/register_user.svg" alt="User" className="mr-2"/>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="輸入帳號或電子郵件"
                        className="flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none"
                    />
                </div>
                <div className="flex items-center ">
                    <img src="/register_pwd.svg" alt="Lock" className="mr-2"/>
                    <div className='flex-1 border-b-2 border-neutral-500 flex items-center justify-between'>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="輸入密碼"
                            className="p-2 font-semibold focus:outline-none"
                        />
                        <a href="#reset" className="text-sm text-neutral-500 border-b-2 border-neutral-500">忘記密碼</a>
                    </div>
                </div>
                <div className="flex items-center ">
                    <img src="/register_captcha.svg" alt="Verification" className="mr-2"/>
                    <div className='flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                        <input
                            type="text"
                            value={verification}
                            onChange={(e) => setVerification(e.target.value)}
                            placeholder="輸入下方驗證碼"
                            className="p-2 font-semibold focus:outline-none"
                        />
                        <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2"/>
                    </div>
                    
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-4">
                    登入
                </button>
                <div className="flex justify-between mt-4">
                    <a href="#help" className="text-blue-950 text-xl font-bold my-3 mx-auto">註冊帳號</a>
                </div>
            </form>
        </div>
    );
}



     