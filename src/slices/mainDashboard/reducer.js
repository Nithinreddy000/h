import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: "",
  success: "test", 
  user: []
};

const MainDashboard  = createSlice({
  name: "MainDashboard",
  initialState,
  reducers: { 
    dataSuccess(state, action) {
      state.success = "true";
      state.user = action.payload
    },
  },
});

export const {
    dataSuccess
} = MainDashboard.actions

export default MainDashboard.reducer;
