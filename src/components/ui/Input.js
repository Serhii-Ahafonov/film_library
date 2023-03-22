import React from 'react';
import classes from './Input.module.css';

function Input({ name, type, title, onChangeHandler, isValid }) {
  const className = `${classes.control} ${isValid ? classes.error : ''}`;
  return (
    <div key={name} className={className}>
      <label htmlFor={name}>{title}</label>
      <input type={type} id={name} onChange={onChangeHandler.bind(this, name)}/>
    </div>
  )
}

export default Input;