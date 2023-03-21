import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { deleteMovie } from '../../api/moviesApi';
import classes from './MovieItem.module.css';

const MovieItem = ({ id, title }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const detailMovieHandler = () => {
    history.push(`/movies/${id}`);
  };

  const deleteMovieHandler = () => {
    dispatch(deleteMovie(id));
  };

  return (
    <li className={classes.item}>
      <div className={classes.title}>{title}</div>
      <div className={classes.actions}>
        <FontAwesomeIcon icon={faCircleInfo} color='white' size='2x' onClick={detailMovieHandler}/>
        <FontAwesomeIcon icon={faTrash} color='white' size='2x' onClick={deleteMovieHandler}/>
      </div>
    </li>
  );
};

export default MovieItem;
