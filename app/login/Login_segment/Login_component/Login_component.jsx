import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './service/Login_hook'; // 引入之前模組化的 login 函數


export default function Login_Component() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verification, setVerification] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentStep, setCurrentStep] = useState('login'); // 新增狀態控制顯示的界面
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 新增状态控制密码是否显示
    const router = useRouter();

    const handleLoginSubmit =async (event) => {
        event.preventDefault();
        if (!username.trim() || !password.trim()) {
            console.log('使用者名稱和密碼都是必填項');
            alert('使用者名稱和密碼都是必填項。');
            return;
        }
        try {
            const data = await login(username, password);
            console.log('Login successful');
            // 將用戶導向到項目設置頁面，並攜帶 access token
            router.push(`/project_setting`);
        } catch (error) {
            console.error('Login error:', error);
            alert(error.message);
        }
    };

    const handleForgotPasswordClick = () => {
        setCurrentStep('forgotPassword');
        router.push('/login?step=forgotPassword');
        setShowPassword(false);
    };

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();
        if (!email.trim()) {
            console.log('電子郵件是必填項');
            alert('電子郵件是必填項。');
            // 在这里可以设置错误状态并显示错误消息
            return;
        }
        console.log('Request temporary password for email');
        // 假設下一步是輸入驗證碼
        setCurrentStep('verification');
        router.push('/login?step=verification'); 
    };

    const handleVerificationSubmit = (event) => {
        event.preventDefault();
        if (!verification.trim()) {
            console.log('臨時密碼是必填項');
            alert('臨時密碼是必填項。');
            // 在这里可以设置错误状态并显示错误消息
            return;
        }
        console.log('Temporary password verification for verification');
        setCurrentStep('newPassword');
        router.push('/login?step=newPassword');
        setShowPassword(false);
    };

    const handleNewPasswordSubmit = (event) => {
        event.preventDefault();
        if (!newPassword.trim() || !confirmPassword.trim()) {
            console.log('新密碼和確認新密碼都是必填項');
            alert('新密碼和確認新密碼都是必填項。');
            return;
        }
        else if (newPassword !== confirmPassword) {
            // 如果密码不匹配，显示一个警告消息并直接返回，不继续执行后续代码
            alert('新密碼與確認密碼不匹配，請重新輸入。');
            return;
        }
        console.log('New password set for email');
        setCurrentStep('login');
        router.push('/login'); 
        setUsername('');
        setPassword('');
        setVerification('');
        setNewPassword('');
        setConfirmPassword('');
        setEmail('');
        setShowPassword(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // 根據currentStep顯示不同的界面
    switch (currentStep) {
        case 'login':
            return (
                <div className="container mx-auto p-4 bg-white w-full h-full">
                    <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
                    <div className="text-blue-950 text-2xl font-semibold my-16">
                        登入以繼續
                    </div>
                    <form onSubmit={handleLoginSubmit} className="flex flex-col ">
                        <div className="flex items-center mt-4" >
                            <img src="/register_user.svg" alt="User" className="mr-2"/>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="輸入帳號或電子郵件"
                                className="min-w-0 flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <img src="/register_pwd.svg" alt="Lock" className="mr-2"/>
                            <div className='min-w-0 flex-1 border-b-2 border-neutral-500 flex items-center justify-between '>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="輸入密碼"
                                    className="min-w-0 p-2 font-semibold focus:outline-none min-w-0"
                                />
                                <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2 cursor-pointer" onClick={toggleShowPassword}/>
                                <button type="button" onClick={handleForgotPasswordClick} className="whitespace-nowrap text-sm text-neutral-500 border-b-2 border-neutral-500">忘記密碼</button>                
                            </div>
                        </div>
                        {/* <div className="flex items-center ">
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
                            
                        </div> */}
                        <button type="submit" className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-8">
                            登入
                        </button>
                        <div className="flex justify-between mt-4">
                            <a href="/register" className="text-blue-950 text-xl font-bold my-3 mx-auto">註冊帳號</a>
                        </div>
                    </form>
                </div>
            );
        case 'forgotPassword':
            return (
                <div className="container mx-auto p-4 bg-white w-full h-full">
                    <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
                    <div className="text-blue-950 text-2xl font-extrabold my-16">
                        忘記密碼
                    </div>
                    <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col ">
                        <div className="flex items-center ">
                            <img src="/register_forget_pwd_email.svg" alt="Verification" className="mr-2"/>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="輸入電子信箱獲取臨時密碼"
                                className="min-w-0 flex-1 p-2 font-semibold border-b-2 border-neutral-500 focus:outline-none"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-12">
                            送出
                        </button>
                    </form>
                </div>
            );
            case 'verification':
                return (
                    <div className="container mx-auto p-4 bg-white w-full h-full">
                        <img src="/register_logo.svg" alt="T.A.P. Logo" className="mb-4" />
                        <div className="text-blue-950 text-2xl font-extrabold my-16">
                            輸入臨時密碼登入
                        </div>
                        <form onSubmit={handleVerificationSubmit} className="flex flex-col ">
                            <div className="flex items-center ">
                                <img src="/register_captcha.svg" alt="Verification" className="mr-2"/>
                                <div className='min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={verification}
                                        onChange={(e) => setVerification(e.target.value)}
                                        placeholder="請輸入密碼"
                                        className="min-w-0 p-2 font-semibold focus:outline-none"
                                    />
                                    <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2 cursor-pointer" onClick={toggleShowPassword}/>
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-12">
                                下一步
                            </button>
                        </form>
                    </div>
                );
                case 'newPassword':
                    return (
                        <div className="container mx-auto p-4 bg-white w-full h-full">
                            <img src="/register_logo.svg" alt="T.A.P. Logo" className=" mb-4" />
                            <div className="text-blue-950 text-2xl font-extrabold my-16">
                                重新設定密碼
                            </div>
                            <form onSubmit={handleNewPasswordSubmit} className="flex flex-col ">
                                <div className="flex items-center ">
                                    <img src="/register_pwd.svg" alt="Verification" className="mr-2"/>
                                    <div className='min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="新密碼"
                                            className="min-w-0 p-2 font-semibold focus:outline-none"
                                        />
                                        <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2 cursor-pointer" onClick={toggleShowPassword}/>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <img src="/register_pwd2.svg" alt="Verification" className="mr-2"/>
                                    <div className='min-w-0 flex-1  border-b-2 border-neutral-500 flex items-center justify-between'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="再次輸入新密碼"
                                            className="min-w-0 p-2 font-semibold focus:outline-none"
                                        />
                                        <img src="/register_pwd_eye.svg" alt="Verification" className="mr-2 cursor-pointer" onClick={toggleShowPassword}/>
                                    </div>
                                </div>
                                <button type="submit" className="bg-blue-500 text-white font-semibold text-xl rounded-lg p-2 mt-12">
                                    送出
                                </button>
                            </form>
                        </div>
                    );
    }
}
