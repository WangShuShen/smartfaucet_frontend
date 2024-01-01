// faucetinfo_hooks.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucetDetails } from "../../../../redux/faucet_ctrl/faucet_control";
import type { RootState, AppDispatch } from "../../../../redux/store";

export const useFaucetInfo = (faucetUid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { faucetDetail, loading, error } = useSelector(
    (state: RootState) => state.faucetDetails
  );

  useEffect(() => {
    if (faucetUid) {
      dispatch(fetchFaucetDetails(faucetUid));
    }
  }, [dispatch, faucetUid]);

  return { faucetDetail, loading, error };
};
