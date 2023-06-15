import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";

// Creates a Redux store that holds the complete state tree of your app.
// There should only be a single store in your app.
export const store = configureStore({
  reducer: {
    users: usersReducer,
    // newFeature1: newFeatureReducer1
    // newFeature2: newFeatureReducer2
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
