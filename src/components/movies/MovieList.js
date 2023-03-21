import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchMovies } from '../../api/moviesApi';

import MovieItem from './MovieItem';
import MovieFiltering from './MovieFiltering';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('order') === 'ASC';

  useEffect(() => {
    setResults(movies)
  },[movies])

  const changeSortingHandler = async () => {
    const sortParams = `?sort=title&order=${(isSortingAscending ? 'DESC': 'ASC')}`;
    const sortedMovies = await fetchMovies(sortParams);
    history.push({ pathname: location.pathname, search: sortParams});
    setResults(sortedMovies);
  };

  const onSearchChange = async (value) => {
    setIsLoading(true);
    if (value.length > 1) {
      setTimeout(async () => {
        const searchedMovies = await fetchMovies(`?search=${value}`);
        setResults(searchedMovies);
      }, 600);
    } else {
      const movies = await fetchMovies();
      setResults(movies);
    }
    setIsLoading(false);
    setQuery(value);
  };

  return (
    <Fragment>
      <MovieFiltering
        isSortingAscending={isSortingAscending}
        onChange={changeSortingHandler}
        onSearch={onSearchChange}
        query={query}
      />
      {results.length > 0 && !isLoading &&
        <ul className={classes.list}>
          {results.map((movie) => (
            <MovieItem key={movie.id} id={movie.id} title={movie.title}/>
          ))}
        </ul>
      }
      {!isLoading && results.length === 0 && <h1 className={classes.message}>No movies found</h1>}
      {isLoading && <LoadingSpinner/>}
    </Fragment>
  );
};

export default MovieList;
