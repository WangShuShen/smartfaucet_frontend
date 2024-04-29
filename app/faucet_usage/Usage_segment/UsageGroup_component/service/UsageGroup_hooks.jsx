import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLatestUsage } from "@/app/redux/faucet_usage/usage";

export const useFaucetUsageData = ({ faucet_uid }) => {
  const dispatch = useDispatch();
  const { latestUpdate, loading_usage, error_usage } = useSelector(
    (state) => state.faucetUsage
  );
  const { faucet_info, loading_info, error_info } = useSelector(
    (state) => state.faucetinfo
  );
  useEffect(() => {
    if (faucet_uid) dispatch(fetchLatestUsage(faucet_uid));
  }, [dispatch]);

  return { latestUpdate, loading_usage, error_usage };
};
