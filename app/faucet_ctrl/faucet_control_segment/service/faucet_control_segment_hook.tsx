// faucetinfo_hooks.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucetSetting } from "../../../redux/faucet_ctrl/faucet_control";
import type { RootState, AppDispatch } from "../../../redux/store";

export const useFaucetSetting = (faucetUid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { faucetDetail, loading_detail, error_detail } = useSelector(
    (state: RootState) => state.faucetSetting
  );

  useEffect(() => {
    if (
      faucetUid &&
      !(typeof faucetUid === "object" && Object.keys(faucetUid).length === 0)
    ) {
      dispatch(fetchFaucetSetting(faucetUid));
    }
  }, [dispatch, faucetUid]);

  return { faucetDetail, loading_detail, error_detail };
};
