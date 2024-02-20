//Creating a slice in redux toolkit.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../helper/axios';
import { requests } from "../../helper/apirequests";

const initialState = {
    netflixOriginals: {
        status: "idle",
        data: null,
        error: null
    }

}
// for api calls create an async thunk function.
export const fetchNetflixOriginals = createAsyncThunk(
    'tv/fetchNetflixOriginals',
    async () => {
        const response = await axios.get(requests.getNetflixOriginals);
        return response.data;
    }
);

export const tvSlice = createSlice({
    initialState,
    name: "tv",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNetflixOriginals.pending, (state, action) => {
                state.netflixOriginals.status = "loading";
            })
            .addCase(fetchNetflixOriginals.fulfilled, (state, action) => {
                state.netflixOriginals.status = "success";
                state.netflixOriginals.data = action.payload;
            })
            .addCase(fetchNetflixOriginals.rejected, (state, action) => {
                state.netflixOriginals.status = "error";
                state.netflixOriginals.error = action.error;
            })
    }
})


export const selectNetflixOriginals = (state) => state.tv.netflixOriginals;

export default tvSlice.reducer;