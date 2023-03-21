import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    isLoading: false,
    errors: false,
    changed: false,
  },
  reducers: {
    addMovies: (state, action) => {
      const newMovie = {
        id: action.payload.id,
        title: action.payload.title,
        year: action.payload.year,
        format: action.payload.format,
        actors: action.payload.actors
      };
      return { movies: state.movies.push(newMovie), changed: true, isLoading: false, errors: false }
    },
    importMovies: (state, action) => {
      return { ...state, movies: action.payload.concat(state.movies), changed: true, errors: false };
    },
    replaceMovies: (state, action) => {
      return { ...state, movies: action.payload, isLoading: false, errors: false };
    },
    removeMovie: (state, action) => {
      return { ...state, movies: state.movies.filter(movie => movie.id !== action.payload), errors: false, changed: false }
    },
    setLoading: (state, action) => {
      return { ...state, isLoading: action.payload };
    },
    setError: (state, action) => {
      return { ...state, errors: action.payload, isLoading: false };
    },
  }
});

export const addMovies = moviesSlice.actions.addMovies;
export const importMovies = moviesSlice.actions.importMovies;
export const replaceMovies = moviesSlice.actions.replaceMovies;
export const removeMovie = moviesSlice.actions.removeMovie;
export const setLoading = moviesSlice.actions.setLoading;
export const setError = moviesSlice.actions.setError;
export default moviesSlice.reducer;