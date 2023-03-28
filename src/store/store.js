import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
// import rootReducer from "./reducers";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
