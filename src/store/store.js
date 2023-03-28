import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
// import rootReducer from "./reducers";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartReducer,
  },
});

export default store;
