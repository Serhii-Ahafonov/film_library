import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../api/moviesApi';

import MovieDescription from '../../components/movies/MovieDescription';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorOverlay from '../../components/ui/ErrorOverlay';

function MovieDetails() {
  const {isLoading, movies, errors} = useSelector((state) => state.allMovies);
  const dispatch = useDispatch();
  const params = useParams();
  const { movieId } = params;

  useLayoutEffect(() => {
    dispatch(fetchMovies(`/${movieId}`));
  }, [dispatch])

  if (isLoading) return <LoadingSpinner/>;
  if (errors) return <ErrorOverlay message={errors.message}/>;

  return (
    <MovieDescription {...movies}/>
  );
}

export default MovieDetails;