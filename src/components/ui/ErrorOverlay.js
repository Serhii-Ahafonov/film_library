import React from 'react';
import classes from './ErrorOverlay.module.css';

const ErrorOverlay = ({ message }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>An Error occured!</div>
      <div className={classes.text}>{ message }</div>
    </div>
);
}

export default ErrorOverlay;
