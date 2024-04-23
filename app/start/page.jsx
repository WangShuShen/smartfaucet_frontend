// Start_Page.js
"use client";
import React, { useState, useEffect  } from 'react';
import { useRouter } from 'next/navigation';
import Toggle_switch_Segment from './Toggle_switch_segment/Toggle_switch_segment';

export default function Start_Page() {
    const [isToggled, setIsToggled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isToggled) {
            // 应用渐变动画，然后1秒后跳转到/login
            setTimeout(() => {
                router.push('/login');
            }, 1200); // 延迟1秒
        }
    }, [isToggled, router]);

    return (
        <div className="relative min-h-screen flex justify-center items-center bg-[url('/home_background.svg')] bg-cover bg-center">
            <div className={`${isToggled ? 'hidden' : "absolute inset-0 bg-custom-cyan	 bg-opacity-60 z-10"}`} />
            <div className="h-screen z-20 flex flex-col justify-around items-center ">
                <img src={isToggled ? "/logo_dark.svg" : "/logo_light.svg"} alt="Logo" className="mb-8 pt-10 " />
                <Toggle_switch_Segment onToggle={() => setIsToggled(!isToggled)} />
            </div>
        </div>
    );
}
