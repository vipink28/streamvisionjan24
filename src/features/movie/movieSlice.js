import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../helper/axios';
import { endpoints, platform, requests } from "../../helper/apirequests";

const initialState = {
    nowPlayingMovies: {
        status: "idle",
        data: null,
        error: null
    }
}

export const fetchNowPlayingMovies = createAsyncThunk(
    'movie/fetchNowPlayingMovies',
    async () => {
        const response = await axios.get(requests.getCollection(platform.movie, endpoints.nowPlaying));
        return response.data;
    }
)

export const movieSlice = createSlice({
    initialState,
    name: "movie",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNowPlayingMovies.pending, (state, action) => {
                state.nowPlayingMovies.status = "loading";
            })
            .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
                state.nowPlayingMovies.status = "success";
                state.nowPlayingMovies.data = action.payload;
            })
            .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
                state.nowPlayingMovies.status = "error";
                state.nowPlayingMovies.error = action.error;
            })
    }
})


export const selectNowPlayingMovies = (state) => state.movie.nowPlayingMovies;

export default movieSlice.reducer;