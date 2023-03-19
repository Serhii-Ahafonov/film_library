import React from 'react';
import MovieDescription from '../components/movies/MovieDescription';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MovieDetails() {
  const params = useParams();
  const { movieId } = params;
  const movies = useSelector((state) => state.allMovies.movies);
  const currentMovie = movies.filter(movie => movie.id === movieId);

  return (
    currentMovie.length && <MovieDescription movie={currentMovie}/>
  );
}

export default MovieDetails;