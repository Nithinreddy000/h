import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: "",
  success: "test", 
  user: []
};

const FinishedProducts  = createSlice({
  name: "FinishedProducts",
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
} = FinishedProducts.actions

export default FinishedProducts.reducer;
