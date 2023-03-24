import React from 'react';
import classes from './Pagination.module.css';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../api/moviesApi';

function Pagination ({total}) {
  const dispatch = useDispatch();
  const pagQuantity = Math.ceil(total / 10);

  const fetchPaginatedMovies = (index) => {
    dispatch(fetchMovies(`?limit=10&offset=${index*10}`));
  };

  const list = Array.from({ length: pagQuantity }, (_, index) => (
    <li key={index} className={classes.item} onClick={()=>fetchPaginatedMovies(index)}>{index + 1}</li>
  ));

  return (
    <ul className={classes.list}>
      {pagQuantity > 1 && list}
    </ul>
  )
}

export default Pagination;