import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/SignupSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,  
  },
});

export default store;
