import { configureStore } from "@reduxjs/toolkit";
import faucetsReducer from "./faucet_ctrl/faucetlistblock";
import faucetDetailsReducer from "./faucet_ctrl/faucet_control";
import faucetUsageReducer from "./faucet_usage/usage";
import figureFaucetUsageReducer from "./faucet_usage/figure";
import faucetInfoReducer from "./faucet_ctrl/faucet_info";
import appReducer from "./app/app";
export const makeStore = () => {
  return configureStore({
    reducer: {
      faucets: faucetsReducer,
      faucetSetting: faucetDetailsReducer,
      faucetUsage: faucetUsageReducer,
      faucetFigure: figureFaucetUsageReducer,
      faucetinfo: faucetInfoReducer,
      app: appReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
