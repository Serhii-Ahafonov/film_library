import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovie } from '../store/movies';
import MovieForm from '../components/movies/MovieForm';

function NewMovie() {
  const dispatch = useDispatch();
  const history = useHistory();

  const addMovieHandler = quoteData => {
    dispatch(addMovie(quoteData));
    history.push('/movies');
  }

  return (
    <MovieForm onAddMovie={addMovieHandler}/>
  );
}

export default NewMovie;
