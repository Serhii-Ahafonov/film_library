import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../api/moviesApi';
import { replaceMovies } from '../store/movies';

import MovieList from '../components/movies/MovieList';
import NoMoviesFound from '../components/movies/NoMoviesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function AllMovies() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const movies = useSelector((state) => state.allMovies.movies);

  useLayoutEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        dispatch(replaceMovies(data));
      } catch (error) {
        setError('Could not fetch movies!');
      }
      setIsLoading(false);
    }

    fetchData();
  }, [])

  if (isLoading) return <LoadingSpinner/>;
  if (!movies || movies.length === 0) return <NoMoviesFound/>
  if (error && !isLoading) return <ErrorOverlay message={error}/>

  return (
    <MovieList movies={movies}/>
  );
}

export default AllMovies;