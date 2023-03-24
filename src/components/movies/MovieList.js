import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import MovieItem from './MovieItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import classes from './MovieList.module.css';

const MovieList = ({ onConfirm }) => {
  const {movies, isLoading} = useSelector((state) => state.allMovies);

  if (isLoading) return <LoadingSpinner/>;
  if (movies.length === 0) return <h1 className={classes.message}>No movies found</h1>;

  return (
    movies.length > 0 &&
      <ul className={classes.list}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} id={movie.id} title={movie.title} onConfirm={onConfirm}/>
        ))}
      </ul>
  );
};

export default MovieList;
