import React from 'react';
import { useSelector } from 'react-redux';
import MainNavigation from './MainNavigation';
import classes from './MainPage.module.css';
import Notification from '../../utils/Notification';

const MainPage = (props) => {
  const { notification } = useSelector((state) => state.notification);

  return (
    <div className={classes.container}>
      <MainNavigation/>
      <div className={classes.content}>{props.children}</div>
      {notification && <Notification message={notification}/>}
    </div>
  );
};

export default MainPage;