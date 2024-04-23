// app/components/AuthCheck.tsx
"use client"; // 確保使用客戶端指示

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AuthCheck() {
    const pathname = usePathname();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken && !['/login', '/register', '/start'].includes(pathname)) {
            window.location.href = '/login';
        }
    }, [pathname]);

    return null; // 此组件不渲染任何内容
}

