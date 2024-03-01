import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../helper/axios";
import { requests } from "../../helper/apirequests"

const initialState = {
    headerDetails: {
        status: "idle",
        data: null,
        error: null
    },
    videoDetails: {
        status: "idle",
        data: null,
        error: null
    }
}

export const fetchHeaderDetails = createAsyncThunk(
    'common/fetchHeaderDetails',
    async (data) => {
        const response = await axios.get(requests.getDetails(data.type, data.id));
        return response.data;
    }
)

export const fetchVideoDetails = createAsyncThunk(
    'common/fetchVideoDetails',
    async (data) => {
        const response = await axios.get(requests.getDetails(data.type, data.id));
        return response.data;
    }
)
// disptach(fetchVideoDetails({type:"tv", id: id}))

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
            .addCase(fetchVideoDetails.pending, (state, action) => {
                state.videoDetails.status = "loading";
            })
            .addCase(fetchVideoDetails.fulfilled, (state, action) => {
                state.videoDetails.status = "success";
                state.videoDetails.data = action.payload;
            })
            .addCase(fetchVideoDetails.rejected, (state, action) => {
                state.videoDetails.status = "error";
                state.videoDetails.error = action.error;
            })
    }
})


export const selectHeaderDetails = (state) => state.common.headerDetails;
export const selectVideoDetails = (state) => state.common.videoDetails;

export default commonSlice.reducer;