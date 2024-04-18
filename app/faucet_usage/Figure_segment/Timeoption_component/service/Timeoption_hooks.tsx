import { useDispatch,useSelector } from 'react-redux';
import { fetchFigureWeeklyUsage, fetchFigureMonthlyUsage, fetchFigureYearlyUsage, setSelectedTimeFrame } from '../../../../redux/faucet_usage/figure';
import type { AppDispatch,RootState } from "../../../../redux/store";

export const useTimeFrameDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faucet_info, loading_info, error_info } = useSelector(
    (state: RootState) => state.faucetinfo
  );
  const changeTimeFrame = (option: string) => {
    dispatch(setSelectedTimeFrame(option));
    switch (option) {
      case '周':
        dispatch(fetchFigureWeeklyUsage(faucet_info?.faucet_uid));
        break;
      case '月':
        dispatch(fetchFigureMonthlyUsage(faucet_info?.faucet_uid));
        break;
      case '年':
        dispatch(fetchFigureYearlyUsage(faucet_info?.faucet_uid));
        break;
      default:
        break;
    }
  };

  return changeTimeFrame;
};
