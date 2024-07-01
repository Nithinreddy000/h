import { createSlice } from "@reduxjs/toolkit";
import { getCompanySelectionData,  } from './thunk';
export const initialState = {
    CompanySelectionData: [],
    error: {},
};

const CompanySelectionSlice = createSlice({
    name: 'CompanySelectionSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCompanySelectionData.fulfilled, (state, action) => {
            state.CompanySelectionData = action.payload;
        });
        builder.addCase(getCompanySelectionData.rejected, (state, action) => {
            state.error = action.payload.error || null;
        });
      
    }
});

export default CompanySelectionSlice.reducer;