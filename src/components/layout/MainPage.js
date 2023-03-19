import React from 'react';
import MainNavigation from './MainNavigation';
import classes from './MainPage.module.css';

const MainPage = (props) => {
  return (
    <div className={classes.container}>
      <MainNavigation/>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default MainPage;