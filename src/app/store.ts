
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/api";
import themeReducer from "../features/theme/themeSlice"
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(api.middleware),
});
