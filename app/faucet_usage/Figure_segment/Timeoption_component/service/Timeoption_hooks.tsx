// useTimeFrameDispatch.js
import { useDispatch } from 'react-redux';
import { fetchFigureWeeklyUsage, fetchFigureMonthlyUsage, fetchFigureYearlyUsage, setSelectedTimeFrame } from '../../../../redux/faucet_usage/figure';
import type { AppDispatch } from "../../../../redux/store";

export const useTimeFrameDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const changeTimeFrame = (option: string) => {
    dispatch(setSelectedTimeFrame(option));
    switch (option) {
      case '周':
        dispatch(fetchFigureWeeklyUsage('your-faucet-uid'));
        break;
      case '月':
        dispatch(fetchFigureMonthlyUsage('your-faucet-uid'));
        break;
      case '年':
        dispatch(fetchFigureYearlyUsage('your-faucet-uid'));
        break;
      default:
        break;
    }
  };

  return changeTimeFrame;
};
