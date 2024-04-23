"use client";
import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function FigureComponent({ chartData }) {
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
