// faucetinfo_hooks.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucetInfo } from "@/app/redux/faucet_ctrl/faucet_info";
import { fetchLatestUsage } from "@/app/redux/faucet_usage/usage";
import type { RootState, AppDispatch } from "@/app/redux/store";

export const useFaucetUsage = (faucetUid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { latestUpdate, loading_usage, error_usage } = useSelector(
    (state: RootState) => state.faucetUsage
  );
  useEffect(() => {
    if (
      faucetUid &&
      !(typeof faucetUid === "object" && Object.keys(faucetUid).length === 0)
    ) {
      dispatch(fetchLatestUsage(faucetUid));
    }
  }, [dispatch, faucetUid]);

  return { latestUpdate, loading_usage, error_usage };
};
export const useFaucetInfo = (faucetUid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { faucet_info, loading_info, error_info } = useSelector(
    (state: RootState) => state.faucetinfo
  );

  useEffect(() => {
    if (
      faucetUid &&
      !(typeof faucetUid === "object" && Object.keys(faucetUid).length === 0)
    ) {
      dispatch(fetchFaucetInfo(faucetUid));
    }
  }, [dispatch, faucetUid]);

  return { faucet_info, loading_info, error_info };
};
