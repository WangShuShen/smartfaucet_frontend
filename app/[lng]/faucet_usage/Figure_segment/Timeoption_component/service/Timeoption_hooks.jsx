import { useDispatch, useSelector } from "react-redux";
import {
  fetchFigureWeeklyUsage,
  fetchFigureMonthlyUsage,
  fetchFigureYearlyUsage,
  setSelectedTimeFrame,
} from "../../../../../redux/faucet_usage/figure";

export const useTimeFrameDispatch = ({ faucet_uid }) => {
  const dispatch = useDispatch();
  const { faucet_info, loading_info, error_info } = useSelector(
    (state) => state.faucetinfo
  );
  const changeTimeFrame = (option) => {
    dispatch(setSelectedTimeFrame(option));
    switch (option) {
      case "周":
        dispatch(fetchFigureWeeklyUsage(faucet_uid));
        break;
      case "月":
        dispatch(fetchFigureMonthlyUsage(faucet_uid));
        break;
      case "年":
        dispatch(fetchFigureYearlyUsage(faucet_uid));
        break;
      default:
        break;
    }
  };

  return changeTimeFrame;
};
