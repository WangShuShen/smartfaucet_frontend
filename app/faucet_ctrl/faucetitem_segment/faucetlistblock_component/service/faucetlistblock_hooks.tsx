// 在 faucetlistblock_hooks.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucets } from "../../../../redux/faucet_ctrl/faucetlistblock";
import type { RootState } from "../../../../redux/store"; // 導入 RootState 類型
import type { AppDispatch } from "../../../../redux/store";
export const useFaucetListBlock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faucets, loading, error } = useSelector(
    (state: RootState) => state.faucets
  );

  useEffect(() => {
    dispatch(fetchFaucets());
  }, []);

  return { faucets, loading, error };
};
