import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export const useChartData = () => {
  const { weeklyData, monthlyData, yearlyData, selectedTimeFrame } =
    useSelector((state) => state.faucetFigure);

  let data = [];

  switch (selectedTimeFrame) {
    case "周":
    case "week":
      data = weeklyData;
      break;
    case "月":
    case "month":
      data = monthlyData;
      break;
    case "年":
    case "year":
      data = yearlyData;
      break;
    default:
      data = [];
  }

  return data;
};
