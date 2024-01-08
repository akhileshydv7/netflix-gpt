import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        movieResults: null,
        movieNames: null,
    },
    reducers: {
        toogleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMoviesResults: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    },
});

export const { toogleGptSearch, addGptMoviesResults } = gptSlice.actions;
export default gptSlice.reducer;