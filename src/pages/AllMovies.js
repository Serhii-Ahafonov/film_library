import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from '../components/movies/MovieList';
import NoMoviesFound from '../components/movies/NoMoviesFound';

function AllMovies() {
  const movies = useSelector((state) => state.allMovies.movies);

  if (!movies || movies.length === 0) {
    return <NoMoviesFound/>
  }

  return (
    <MovieList movies={movies}/>
  );
}

export default AllMovies;