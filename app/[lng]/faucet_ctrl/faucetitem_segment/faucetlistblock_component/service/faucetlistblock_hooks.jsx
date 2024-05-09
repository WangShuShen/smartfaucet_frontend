import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucets } from "@/app/redux/faucet_ctrl/faucetlistblock";

export function useFaucetListBlock({ location }) {
  const dispatch = useDispatch();
  const { faucets, loading, error } = useSelector(
    (state) => state.faucets
  );

  useEffect(() => {
    dispatch(fetchFaucets(location));
  }, [location]);

  return { faucets, loading, error };
}
