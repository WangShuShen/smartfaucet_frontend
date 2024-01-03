// useFaucetUsageData.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestUsage } from '../../../../redux/faucet_usage/usage';
import type { RootState, AppDispatch } from "../../../../redux/store";

export const useFaucetUsageData = () => {
const dispatch = useDispatch<AppDispatch>();
  const { latestUpdate, loading, error } = useSelector((state: RootState) => state.faucetUsage);
    
  useEffect(() => {
    dispatch(fetchLatestUsage('your-faucet-uid'));
  }, [dispatch]);

  return { latestUpdate, loading, error };
};
