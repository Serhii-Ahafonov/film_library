import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { sendMovies, sendImportMovies } from '../../api/moviesApi';

import MovieForm from '../../components/movies/MovieForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';

function NewMovie() {
  const { changed, isLoading } = useSelector((state) => state.allMovies);
  const dispatch = useDispatch();
  const history = useHistory();

  const addMoviesHandler = (movieData, isImport) => {
    dispatch(isImport ? sendImportMovies(movieData) :  sendMovies(movieData));
  }

  useEffect(() => {
    changed && history.push('/movies');
  }, [changed])

  if (isLoading) return <LoadingSpinner/>;

  return (
    <MovieForm onAddMovie={addMoviesHandler}/>
  );
}

export default NewMovie;
