// app/component/AuthCheck.tsx
"use client"; // 確保使用客戶端指示

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 這可能需要根據您的Next.js版本進行調整

const unprotectedRoutes = ['/login', '/register', '/start'];

export default function AuthCheck() {
    const pathname = usePathname();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        // 如果沒有accessToken且當前路徑在unprotectedRoutes中，重定向到'/login'
        if (!accessToken && !unprotectedRoutes.includes(pathname)) {
            window.location.href = '/login';
        }
        // 如果有accessToken且當前路徑在unprotectedRoutes中，重定向到'/project_setting'
        if (accessToken && unprotectedRoutes.includes(pathname)) {
            window.location.href = '/project_setting';
        }
    }, [pathname]);

    return null; // 此組件不渲染任何內容
}
