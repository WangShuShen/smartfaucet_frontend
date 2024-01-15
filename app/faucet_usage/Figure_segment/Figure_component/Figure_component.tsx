import React from "react";
import dynamic from "next/dynamic";
import { useChartData } from "./service/Figure_hooks";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ExampleChart() {
  const chartData = useChartData();

  const series = [
    {
      name: "Usage",
      data: chartData.map((item) => item.total_usage_count),
    },
  ];

  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: chartData.map((item) => item.date),
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
