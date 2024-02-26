//Creating a slice in redux toolkit.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../helper/axios';
import { endpoints, platform, requests } from "../../helper/apirequests";

const initialState = {
    netflixOriginals: {
        status: "idle",
        data: null,
        error: null
    },
    popularShows: {
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

export const fetchPopularShows = createAsyncThunk(
    'tv/fetchPopularShows',
    async () => {
        const response = await axios.get(requests.getCollection(platform.tv, endpoints.popular));
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
            .addCase(fetchPopularShows.pending, (state, action) => {
                state.popularShows.status = "loading";
            })
            .addCase(fetchPopularShows.fulfilled, (state, action) => {
                state.popularShows.status = "success";
                state.popularShows.data = action.payload;
            })
            .addCase(fetchPopularShows.rejected, (state, action) => {
                state.popularShows.status = "error";
                state.popularShows.error = action.error;
            })
    }
})


export const selectNetflixOriginals = (state) => state.tv.netflixOriginals;

export const selectPopularShows = (state) => state.tv.popularShows;

export default tvSlice.reducer;