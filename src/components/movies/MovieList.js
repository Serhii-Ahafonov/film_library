import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MovieItem from './MovieItem';
import classes from './MovieList.module.css';
import MovieFiltering from './MovieFiltering';

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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc';

  useEffect(() => {
    const sortedMovies = sortMovies(props.movies, isSortingAscending);
    setResults(sortedMovies)
  },[props.movies])

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc': 'asc')}`
    });
    setResults(sortMovies(props.movies, isSortingAscending));
  };

  const onSearchChange = (value) => {
    const query = value.toLowerCase();
    setTimeout(() => {
      const filteredMovies = props.movies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(query);
        const actorMatch = movie.actors.some(actor => actor.toLowerCase().includes(query));
        return titleMatch || actorMatch;
      });
      setResults(filteredMovies);
    }, 600);
    setQuery(query);
  };

  return (
    <Fragment>
      <MovieFiltering
        isSortingAscending={isSortingAscending}
        onChange={changeSortingHandler}
        onSearch={onSearchChange}
        query={query}
      />
      <ul className={classes.list}>
        {results.map((movie) => (
          <MovieItem key={movie.id} id={movie.id} title={movie.title}/>
        ))}
      </ul>
    </Fragment>
  );
};

export default MovieList;
