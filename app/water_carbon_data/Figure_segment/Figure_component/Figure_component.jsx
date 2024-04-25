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
        dataLabels: {enabled: false}
    };

    return (
        <div className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] w-full">
          <Chart type="area" options={options} series={series} height={700} width="100%" />
        </div>
    );
}
