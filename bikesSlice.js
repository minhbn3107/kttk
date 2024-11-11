import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BIKES_URL = "https://670a3e0aaf1a3998baa376c4.mockapi.io/bike";

const initialState = {
    bikes: [],
};

export const fetchBikes = createAsyncThunk("bikes/fetchBikes", async () => {
    const response = await axios.get(BIKES_URL);
    return response.data;
});

export const addNewBikes = createAsyncThunk(
    "bikes/addNewBikes",
    async (initialTodo) => {
        const response = await axios.post(BIKES_URL, initialTodo);
        return response.data;
    }
);

const bikesSlice = createSlice({
    name: "bikes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBikes.fulfilled, (state, action) => {
            state.bikes = action.payload;
        });
    },
});

export const selectBikes = (state) => state.bikes.bikes;

export default bikesSlice.reducer;
