// // Figure_component.tsx
// "use client";
// import React from "react";
// import dynamic from "next/dynamic";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function FigureComponent() {
//     // 使用假資料替代從useChartData獲取的數據
//     const chartData = [
//         { date: '2023-01', total_usage_count: 1000 },
//         { date: '2023-02', total_usage_count: 1500 },
//         { date: '2023-03', total_usage_count: 700 },
//         { date: '2023-04', total_usage_count: 700 },
//         { date: '2023-05', total_usage_count: 900 },
//         { date: '2023-06', total_usage_count: 1500 },
//         // 添加更多假資料...
//     ];

//     const series = [
//         {
//             name: "Usage",
//             data: chartData.map((item) => item.total_usage_count),
//         },
//     ];

//     const options = {
//         chart: {
//             id: "apexchart-example",
//         },
//         xaxis: {
//             categories: chartData.map((item) => item.date),
//         },
//     };
//     const [isClient, setIsClient] = React.useState(false);

//     return (
//         <div>
//           <Chart
//             type="area"
//             options={options}
//             series={series}
//             height={700}
//             width={1600}
//         />   
//         </div>
//     );
// }


"use client";
import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface FigureComponentProps {
  chartData: Array<{ date: string; total_usage_count: number }>;
}

export default function FigureComponent({ chartData }: FigureComponentProps) {
    const series = [{
        name: "Usage",
        data: chartData.map(item => item.total_usage_count),
    }];

    const options = {
        chart: { id: "apexchart-example" },
        xaxis: { categories: chartData.map(item => item.date) },
    };

    return (
        <div>
          <Chart type="area" options={options} series={series} height={700} width="100%" />
        </div>
    );
}
