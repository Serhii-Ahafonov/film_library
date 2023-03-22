import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { sendMovies, sendImportMovies } from '../../api/moviesApi';

import MovieForm from '../../components/movies/MovieForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import ErrorOverlay from '../../components/ui/ErrorOverlay';

function NewMovie() {
  const { changed, isLoading, errors } = useSelector((state) => state.allMovies);
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
    <Fragment>
      { errors && errors.message && <ErrorOverlay message={errors.message}/> }
      <MovieForm onAddMovie={addMoviesHandler}/>
    </Fragment>
  );
}

export default NewMovie;
