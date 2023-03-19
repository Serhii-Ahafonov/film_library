import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './NoMoviesFound.module.css';

function NoMoviesFound() {
  const history = useHistory();

  return (
    <div className={classes.nomovies}>
      <p>No movies found!</p>
      <button onClick={() => history.push('/new-movie')}>
        Add a Movie
      </button>
    </div>
  );
}

export default NoMoviesFound;