// "use client"; // don't forget this part if you use app dir to mark the whole
// // file as client-side components
// import React from "react";
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// export default function ExampleChart() {
//   const option = {
//     chart: {
//       id: "apexchart-example",
//     },
//     xaxis: {
//       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//     },
//   };

//   const series = [
//     {
//       name: "series-1",
//       data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//     },
//   ];

//   return (
//     <div className="flex justify-around">
//       <Chart
//         type="area"
//         options={option}
//         series={series}
//         height={700}
//         width={1800}
//       />
//     </div>
//   );
// }

// ExampleChart.js
import React from 'react';
import dynamic from 'next/dynamic';
import { useChartData } from './service/Figure_hooks';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ExampleChart() {
  const chartData = useChartData();

  const series = [{
    name: "Usage",
    data: chartData.map(item => item.total_usage_count),
  }];

  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: chartData.map(item => item.date),
    },
  };

  return (
    <div className="flex justify-around">
      <Chart
        type="area"
        options={options}
        series={series}
        height={700}
        width={1600}
      />
    </div>
  );
}
