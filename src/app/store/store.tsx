import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/route";
import pizzaReducer from "../reducer/reducer";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    pizza: pizzaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
