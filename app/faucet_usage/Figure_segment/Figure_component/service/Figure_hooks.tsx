// useChartData.js
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export const useChartData = () => {
  const { weeklyData, monthlyData, yearlyData, selectedTimeFrame } =
    useSelector((state: RootState) => state.faucetFigure);

  let data: any[] = [];

  switch (selectedTimeFrame) {
    case "周":
      data = weeklyData;
      break;
    case "月":
      data = monthlyData;
      break;
    case "年":
      data = yearlyData;
      break;
    default:
      data = [];
  }

  return data;
};
