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
        id: 'movie-' + (Math.random() * 100000).toFixed(),
        title: newMovie.title,
        year: newMovie.year,
        format: newMovie.format,
        actors: newMovie.actors
      });
    },
    addMovies: (state, action) => {
      const newMovies = action.payload;

      newMovies.map(movie => {
        state.movies.push({
          id: 'movie-' + (Math.random() * 100000).toFixed(),
          title: movie.title,
          year: movie.year,
          format: movie.format,
          actors: movie.actors
        });
      })
    },
    removeMovie: (state, action) => {
      const id = action.payload;
      state.movies = state.movies.filter(movie => movie.id !== id);
    }
  }
});

export const addMovie = moviesSlice.actions.addMovie;
export const addMovies = moviesSlice.actions.addMovies;
export const removeMovie = moviesSlice.actions.removeMovie;
export default moviesSlice.reducer;