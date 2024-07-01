import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
    getCompanySelectionData as getCompanySelectionDataApi,
    // addCompanySelectionData as addCompanySelectionDataApi,
    // updateCompanySelectionData as updateCompanySelectionDataApi,
    // deleteCompanySelectionData as deleteCompanySelectionDataApi
} from "../../helpers/fakebackend_helper";

export const getCompanySelectionData = createAsyncThunk("companySelection/getCompanySelectionData", async () => {
    try {
        const response = getCompanySelectionDataApi();
        return response;
    } catch (error) {
        return error;
    }
});

// export const addCompanySelectionData = createAsyncThunk("companySelection/addCompanySelectionData", async (team) => {
//     try {
//         const response = addCompanySelectionDataApi(team);
//         toast.success("Company Data Added Successfully", { autoClose: 3000 });
//         return response;
//     } catch (error) {
//         toast.error("Company Data Added Failed", { autoClose: 3000 });
//         return error;
//     }
// });

// export const updateCompanySelectionData = createAsyncThunk("companySelection/updateCompanySelectionData", async (project) => {
//     try {
//         const response = updateCompanySelectionDataApi(project);
//         toast.success("Company Data Updated Successfully", { autoClose: 3000 });
//         return response;
//     } catch (error) {
//         toast.error("Company Data Updated Failed", { autoClose: 3000 });
//         return error;
//     }
// });

// export const deleteCompanySelectionData = createAsyncThunk("companySelection/updateCompanySelectionData", async (project) => {
//     try {
//         const response = deleteCompanySelectionDataApi(project);
//         toast.success("Company Data Delete Successfully", { autoClose: 3000 });
//         return response;
//     } catch (error) {
//         toast.error("Company Data Delete Failed", { autoClose: 3000 });
//         return error;
//     }
// });