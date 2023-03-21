import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../api/moviesApi';

import MovieDescription from '../components/movies/MovieDescription';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function MovieDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({})
  const params = useParams();
  const { movieId } = params;

  useLayoutEffect(() => {
    setIsLoading(true);
    const fetchMovieDescription = async () => {
      try {
        const data = await fetchMovies(`/${movieId}`);
        setMovie(data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }

    fetchMovieDescription();
  }, [])

  if (isLoading) return <LoadingSpinner/>;

  return (
    <MovieDescription {...movie}/>
  );
}

export default MovieDetails;