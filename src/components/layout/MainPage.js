import React from 'react';
import MainNavigation from './MainNavigation';
import classes from './MainPage.module.css';
import ErrorOverlay from '../ui/ErrorOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const MainPage = (props) => {
  const { errors } = useSelector((state) => state.allMovies);
  const dispatch = useDispatch();

  dispatch(authActions.login());
  return (
    <div className={classes.container}>
      <MainNavigation/>
      {/*{errors && <ErrorOverlay message={errors}/>}*/}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default MainPage;