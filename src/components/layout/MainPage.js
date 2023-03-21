import React from 'react';
import { useSelector } from 'react-redux';
import MainNavigation from './MainNavigation';
import classes from './MainPage.module.css';
import ErrorOverlay from '../ui/ErrorOverlay';

const MainPage = (props) => {
  const { errors } = useSelector((state) => state.allMovies);

  return (
    <div className={classes.container}>
      <MainNavigation/>
      {/*{errors && <ErrorOverlay message={errors}/>}*/}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default MainPage;