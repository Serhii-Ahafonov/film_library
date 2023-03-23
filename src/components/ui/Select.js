import React from 'react';
import classes from './Select.module.css';

function Select({ name, options, title, onChangeHandler, errorMessage }) {
  const className = `${classes.control} ${errorMessage ? classes.error : ''}`;
  const error = errorMessage && errorMessage.length && errorMessage.replaceAll('_', ' ').toLowerCase();

  return (
    <div className={className}>
      <label htmlFor={name}>{title}</label>
      { error && <span className={classes.errorMessage}>{`field ${error}`}</span> }
      <select onClick={onChangeHandler.bind(this, name)}>
        <option value="" disabled selected hidden>Please select format...</option>
        {options.map(option => <option value={option}>{option}</option>)}
      </select>
    </div>
  )
}

export default Select;