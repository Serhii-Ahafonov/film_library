import React, { Fragment, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { deleteMovie, fetchMovies } from '../../api/moviesApi';

import MovieList from '../../components/movies/MovieList';
import NoMoviesFound from '../../components/movies/NoMoviesFound';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import MovieFiltering from '../../components/movies/MovieFiltering';
import ConfirmModal from '../../components/ui/ConfirmModal';

function AllMovies() {
  const [deleteMovieId, setDeleteMovieId] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { movies, isLoading, error } = useSelector((state) => state.allMovies);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('order') === 'ASC';

  useLayoutEffect(() => {
    if (searchValue.length > 1) {
      const timer = setTimeout(() => {
        const searchParams = `?search=${searchValue}`;
        dispatch(fetchMovies(searchParams));
        changePathParams(searchParams);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      dispatch(fetchMovies());
    }
  }, [searchValue]);

  const changePathParams = (params) => {
    history.push({ pathname: location.pathname, search: params});
  }

  const changeSortingHandler = async () => {
    const sortParams = `?sort=title&order=${(isSortingAscending ? 'DESC': 'ASC')}`;

    dispatch(fetchMovies(sortParams));
    changePathParams(sortParams);
  };

  const onDeleteMovie = () => {
    dispatch(deleteMovie(deleteMovieId));
    setDeleteMovieId(false);
  }

  const onConfirmHandler = (id) => {
    setDeleteMovieId(id);
  }

  if (isLoading && !location.search) return <LoadingSpinner/>;
  if (!movies || movies.length === 0 && !location.search) return <NoMoviesFound/>
  if (error && !isLoading) return <ErrorOverlay message={error}/>

  return (
    <Fragment>
      <MovieFiltering
        isSortingAscending={isSortingAscending}
        onChange={changeSortingHandler}
        onSearch={setSearchValue}
        value={searchValue}
      />
      <MovieList movies={movies} onConfirm={onConfirmHandler}/>
      {deleteMovieId &&
        <ConfirmModal
          message='Do you want to delete this movie?'
          onCancel={() => setDeleteMovieId(false)}
          onConfirm={onDeleteMovie}/>
      }
    </Fragment>
  );
}

export default AllMovies;