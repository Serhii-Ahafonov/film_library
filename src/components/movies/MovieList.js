import React, { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MovieItem from './MovieItem';
import classes from './MovieList.module.css';

const sortMovies = (movies, ascending) => {
  return movies.slice().sort((movieA, movieB) => {
    if (ascending) {
      return movieA.title > movieB.title ? 1 : -1;
    } else {
      return movieA.title < movieB.title ? 1 : -1;
    }
  });
};

const MovieList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';
  const sortedMovies = sortMovies(props.movies, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc': 'asc')}`
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedMovies.map((movie) => (
          <MovieItem
            key={movie.id}
            id={movie.id}
            title={movie.title}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default MovieList;
