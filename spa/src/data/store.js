import { configureStore } from "@reduxjs/toolkit";
import { coreApi } from "./services/core";

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
  },
  middleware: (buildGetDefaultMiddleware) =>
    buildGetDefaultMiddleware({ serializableCheck: false }).concat([
      coreApi.middleware,
    ]),
});
