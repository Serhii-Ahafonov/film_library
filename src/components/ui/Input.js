import React from 'react';
import classes from './Input.module.css';

function Input({ name, type, title, onChangeHandler, errorMessage }) {
  const className = `${classes.control} ${errorMessage ? classes.error : ''}`;
  const error = errorMessage && errorMessage.length && errorMessage.replaceAll('_', ' ').toLowerCase();

  return (
    <div className={className}>
      <label htmlFor={name}>{title}</label>
      { error && <span className={classes.errorMessage}>{`field ${error}`}</span> }
      <input type={type} id={name} onChange={onChangeHandler.bind(this, name)}/>
    </div>
  )
}

export default Input;