import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucets } from "@/app/redux/faucet_ctrl/faucetlistblock";
import type { RootState } from "@/app/redux/store";
import type { AppDispatch } from "@/app/redux/store";
export function useFaucetListBlock({ location }) {
  const dispatch = useDispatch<AppDispatch>();
  const { faucets, loading, error } = useSelector(
    (state: RootState) => state.faucets
  );

  useEffect(() => {
    dispatch(fetchFaucets(location));
  }, [location]);

  return { faucets, loading, error };
}
