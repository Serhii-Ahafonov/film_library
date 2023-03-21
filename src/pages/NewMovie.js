import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addMovies, importMovies } from '../api/moviesApi';

import MovieForm from '../components/movies/MovieForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function NewMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const addMovieHandler = async movieData => {
    setIsLoading(true);
    try {
      const data = await addMovies(movieData);
      if (data) {
        history.push('/movies');
      }
    } catch (error) {
      setError(`Could not save data (${error.code}) - please try again later!`);
    }
    setIsLoading(false);
  }
  const importMovieHandler = async (formData) => {
    setIsLoading(true);
    try {
      const data = await importMovies(formData);
      if (data) {
        history.push('/movies');
      } else {
        alert('Sorry!')
      }
    } catch (error) {
      setError('Could not save data - please try again later!');
    }
    setIsLoading(false);
  };

  if (isLoading) return <LoadingSpinner/>;
  if (error && !isLoading) return <ErrorOverlay message={error}/>

  return (
    <MovieForm onAddMovie={addMovieHandler} onImport={importMovieHandler}/>
  );
}

export default NewMovie;
