export const fetchMockData = (timeFrame: string, buildingId: string): Promise<any[]> => {
    // 假設每個建築物有不同的數據
    const mockData = {
        building1: { // 建築物ID為1的數據
            'week': [
                { date: '2023-W01', total_usage_count: 800 },
                { date: '2023-W02', total_usage_count: 950 },
                { date: '2023-W03', total_usage_count: 700 },
                { date: '2023-W04', total_usage_count: 1050 },
                { date: '2023-W05', total_usage_count: 900 },
                { date: '2023-W06', total_usage_count: 1250 },
            ],
            'month': [
                { date: '2023-01', total_usage_count: 1200 },
                { date: '2023-02', total_usage_count: 1500 },
                { date: '2023-03', total_usage_count: 1900 },
                { date: '2023-04', total_usage_count: 1000 },
                { date: '2023-05', total_usage_count: 1500 },
                { date: '2023-06', total_usage_count: 2300 },
            ],
            'year': [
                { date: '2022', total_usage_count: 14000 },
                { date: '2023', total_usage_count: 15000 },
                { date: '2024', total_usage_count: 19000 },
                { date: '2025', total_usage_count: 13000 },
                { date: '2026', total_usage_count: 11000 },
                { date: '2027', total_usage_count: 16000 },
            ],
        },
        building2: { // 建築物ID為2的數據
            'week': [
                { date: '2023-W01', total_usage_count: 500 },
                { date: '2023-W02', total_usage_count: 600 },
                { date: '2023-W03', total_usage_count: 500 },
                { date: '2023-W04', total_usage_count: 600 },
                { date: '2023-W05', total_usage_count: 500 },
                { date: '2023-W06', total_usage_count: 600 },
            ],
            'month': [
                { date: '2023-01', total_usage_count: 1000 },
                { date: '2023-02', total_usage_count: 1100 },
                { date: '2023-03', total_usage_count: 1300 },
                { date: '2023-04', total_usage_count: 1400 },
                { date: '2023-05', total_usage_count: 1500 },
                { date: '2023-06', total_usage_count: 1900 },
            ],
            'year': [
                { date: '2022', total_usage_count: 12000 },
                { date: '2023', total_usage_count: 12500 },
                { date: '2024', total_usage_count: 14258 },
                { date: '2025', total_usage_count: 23715 },
                { date: '2026', total_usage_count: 16847 },
                { date: '2027', total_usage_count: 19634 },
            ],
        },
        building3: { // 建築物ID為3的數據
            'week': [
                { date: '2023-W01', total_usage_count: 100 },
                { date: '2023-W02', total_usage_count: 200 },
                { date: '2023-W03', total_usage_count: 500 },
                { date: '2023-W04', total_usage_count: 600 },
                { date: '2023-W05', total_usage_count: 500 },
                { date: '2023-W06', total_usage_count: 900 },
            ],
            'month': [
                { date: '2023-01', total_usage_count: 1900 },
                { date: '2023-02', total_usage_count: 1600 },
                { date: '2023-03', total_usage_count: 1300 },
                { date: '2023-04', total_usage_count: 1400 },
                { date: '2023-05', total_usage_count: 1500 },
                { date: '2023-06', total_usage_count: 1000 },
            ],
            'year': [
                { date: '2022', total_usage_count: 11000 },
                { date: '2023', total_usage_count: 12500 },
                { date: '2024', total_usage_count: 14258 },
                { date: '2025', total_usage_count: 23715 },
                { date: '2026', total_usage_count: 16847 },
                { date: '2027', total_usage_count: 11634 },
            ],
        },
        // 可以添加更多建築物的數據
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            const dataForBuilding = mockData[buildingId] || {};
            const dataForTimeFrame = dataForBuilding[timeFrame] || [];
            resolve(dataForTimeFrame);
        }, 1000); // 模擬網絡延遲
    });
};
