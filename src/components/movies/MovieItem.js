import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { removeMovie } from '../../store/movies';
import { deleteMovie } from '../../api/moviesApi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorOverlay from '../UI/ErrorOverlay';
import classes from './MovieItem.module.css';

const MovieItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const detailMovieHandler = () => {
    history.push(`/movies/${props.id}`);
  };

  const deleteMovieHandler = async () => {
    setIsLoading(true);
    try {
      await deleteMovie(props.id);
      dispatch(removeMovie(props.id));
    } catch (error) {
      setError('Could not delete movie - please try again later!');
    }
    setIsLoading(false);
  };

  if (isLoading) return <LoadingSpinner/>;
  if (error && !isLoading) return <ErrorOverlay message={error}/>

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
