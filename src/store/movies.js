import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
  },
  reducers: {
    addMovie: (state, action) => {
      const newMovie = action.payload;

      state.movies.push({
        id: newMovie.id,
        title: newMovie.title,
        releaseYear: newMovie.releaseYear,
        format: newMovie.format,
        stars: newMovie.stars
      });
    },
    removeMovie: (state, action) => {
      const id = action.payload;
      state.movies = state.movies.filter(movie => movie.id !== id);
    }
  }
});

export const addMovie = moviesSlice.actions.addMovie;
export const removeMovie = moviesSlice.actions.removeMovie;
export default moviesSlice.reducer;