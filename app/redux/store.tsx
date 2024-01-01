import { configureStore } from "@reduxjs/toolkit";
import faucetsReducer from "./faucet_ctrl/faucetlistblock";
import faucetDetailsReducer from "./faucet_ctrl/faucet_control";
export const makeStore = () => {
  return configureStore({
    reducer: {
      faucets: faucetsReducer,
      faucetDetails: faucetDetailsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
