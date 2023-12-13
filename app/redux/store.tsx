// store.ts
import { configureStore } from "@reduxjs/toolkit";
import faucetReducer from "./Faucet_Ctrl_Usage/faucet-ctrl";

export const store = configureStore({
  reducer: {
    faucet: faucetReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
