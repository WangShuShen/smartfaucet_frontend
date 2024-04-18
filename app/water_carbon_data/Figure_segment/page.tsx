// "use client";
// import React from 'react';
// import Figure from './Figure_component/Figure_component';
// import TimeOption from './Time_component/Time_component';

// export default function Figure_Segment() {
//     return (
//         <div className='flex flex-col w-full bg-white rounded-b-2xl block pl-8'>
//                 <TimeOption />
//                 <Figure />
//         </div>
//     );
// }

//Figure_segment.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Figure from './Figure_component/Figure_component';
import TimeOption from './Time_component/Time_component';
import { fetchMockData } from './mockAPI';

export default function FigureSegment() {
    const [timeFrame, setTimeFrame] = useState('周');
    const [chartData, setChartData] = useState<any[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`/api/data?timeFrame=${timeFrame}`);
    //         const data = await response.json();
    //         if (data.status === 'success') {
    //             setChartData(data.data);
    //         }
    //     };
    //     fetchData();
    // }, [timeFrame]);

    useEffect(() => {
        const selectedBuildingId = 1; // 假設這是用戶選擇的建築物ID
        fetchMockData(timeFrame, selectedBuildingId).then(setChartData);
    }, [timeFrame]);

      

    // const handleTimeChange = (newTimeFrame) => {
    //     // 转换时间框架到API期望的格式
    //     const apiTimeFrame = newTimeFrame === '周' ? 'week' : newTimeFrame === '月' ? 'month' : 'year';
    //     setTimeFrame(apiTimeFrame);
    // };
    const handleTimeChange = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
    };

    return (
        <div className='flex flex-col w-full bg-white rounded-b-2xl block pl-8'>
            <TimeOption onTimeChange={handleTimeChange} />
            <Figure chartData={chartData} />
        </div>
    );
}
