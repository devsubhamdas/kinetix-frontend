import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import videoApi from "../api/videoApi.js";
import userApi from "../api/userApi.js";
import commentApi from "../api/commentApi.js";
import subscriptionApi from "../api/subscriptionApi.js";
import impressionApi from "../api/impressionApi.js";
import authSlice from "../features/auth/authSlice.js";
import globalSlice from "../features/global/globalSlice.js";
import progressMiddleware from "../components/nprogress/nprogress.middleware.js";

const store = configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
    [videoApi.reducerPath]: videoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [impressionApi.reducerPath]: impressionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(videoApi.middleware)
      .concat(userApi.middleware)
      .concat(commentApi.middleware)
      .concat(subscriptionApi.middleware)
      .concat(impressionApi.middleware)
      .concat(progressMiddleware),
});

setupListeners(store.dispatch);

export default store;
