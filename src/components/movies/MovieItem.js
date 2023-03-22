import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineMore, AiOutlineDelete  } from 'react-icons/ai';
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
        <AiOutlineDelete size='32px' color='white' onClick={deleteMovieHandler}/>
        <AiOutlineMore size='32px' color='white' onClick={detailMovieHandler}/>
      </div>
    </li>
  );
};

export default MovieItem;
