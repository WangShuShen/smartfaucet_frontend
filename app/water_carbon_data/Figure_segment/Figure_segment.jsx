"use client";
import React, { useState, useEffect } from 'react';
import Figure from './Figure_component/Figure_component';
import TimeOption from './Time_component/Time_component';
import { createApiClient } from "@/utils/apiClient";

export default function FigureSegment({ buildingId }) {
    const [timeFrame, setTimeFrame] = useState('week');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!buildingId) return;

        const apiUrls = {
          week: "faucet/FaucetConsumptionManager/building_week",
          month: "faucet/FaucetConsumptionManager/building_month",
          year: "faucet/FaucetConsumptionManager/building_year",
        };

        const client = createApiClient('post', apiUrls[timeFrame]);

        client('', {
            building_uid: buildingId
        })
        .then(response => {
            // Assuming the API returns data directly in the desired format
            setChartData(response.data.map(item => ({
                total_usage_count: item.usage_count,
                date: item.date
            })));
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [timeFrame, buildingId]);

    return (
        <div className='flex flex-col w-full bg-white rounded-b-2xl block pl-8 '>
            <TimeOption onTimeChange={(value) => setTimeFrame(value)} />
            <Figure chartData={chartData} />
        </div>
    );
}
