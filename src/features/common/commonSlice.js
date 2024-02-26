import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../helper/axios";
import { requests } from "../../helper/apirequests"

const initialState = {
    headerDetails: {
        status: "idle",
        data: null,
        error: null
    }
}

export const fetchHeaderDetails = createAsyncThunk(
    'common/fetchHeaderDetails',
    async (id) => {
        const response = await axios.get(requests.getDetails('tv', id));
        return response.data;
    }
)

export const commonSlice = createSlice({
    initialState,
    name: "common",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaderDetails.pending, (state, action) => {
                state.headerDetails.status = "loading";
            })
            .addCase(fetchHeaderDetails.fulfilled, (state, action) => {
                state.headerDetails.status = "success";
                state.headerDetails.data = action.payload;
            })
            .addCase(fetchHeaderDetails.rejected, (state, action) => {
                state.headerDetails.status = "error";
                state.headerDetails.error = action.error;
            })
    }
})


export const selectHeaderDetails = (state) => state.common.headerDetails;

export default commonSlice.reducer;