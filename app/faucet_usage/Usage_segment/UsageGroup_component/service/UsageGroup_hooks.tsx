import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLatestUsage } from "@/app/redux/faucet_usage/usage";
import type { RootState, AppDispatch } from "@/app/redux/store";

export const useFaucetUsageData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latestUpdate, loading_usage, error_usage } = useSelector(
    (state: RootState) => state.faucetUsage
  );
  const { faucet_info, loading_info, error_info } = useSelector(
    (state: RootState) => state.faucetinfo
  );
  useEffect(() => {
    if (faucet_info?.faucet_uid)
      dispatch(fetchLatestUsage(faucet_info?.faucet_uid));
  }, [dispatch]);

  return { latestUpdate, loading_usage, error_usage };
};
