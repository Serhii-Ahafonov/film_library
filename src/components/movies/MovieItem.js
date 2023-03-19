import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { removeMovie } from '../../store/movies';
import classes from './MovieItem.module.css';

const MovieItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteMovieHandler = () => {
    dispatch(removeMovie(props.id));
  };

  const detailMovieHandler = () => {
    history.push(`/movies/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.actions}>
        <FontAwesomeIcon icon={faCircleInfo} color='white' size='2x' onClick={detailMovieHandler}/>
        <FontAwesomeIcon icon={faTrash} color='white' size='2x' onClick={deleteMovieHandler}/>
      </div>
    </li>
  );
};

export default MovieItem;
