import React, { useState } from 'react';
import classes from './AuthForm.module.css';
import Card from '../ui/Card';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthForm({ isLogin, onSubmit }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const { errors } = useSelector((state) => state.auth);
  const history = useHistory();

  function updateInputValueHandler(inputType, enteredValue) {
    const value = enteredValue.target.value;
    switch (inputType) {
      case 'email':
        setEnteredEmail(value);
        break;
      case 'name':
        setEnteredName(value);
        break;
      case 'password':
        setEnteredPassword(value);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(value);
        break;
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  };

  function switchAuthModeHandler() {
    if (isLogin) {
      history.push('signup');
    } else {
      history.push('login');
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={`${classes.control} ${errors && errors['data/email'] ? classes.error : ''}`}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' onChange={updateInputValueHandler.bind(this, 'email')}/>
        </div>
        { !isLogin &&
          <div className={`${classes.control} ${errors && errors['data/name'] ? classes.error : ''}`}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' onChange={updateInputValueHandler.bind(this, 'name')}/>
          </div>
        }
        <div className={`${classes.control} ${errors && errors['data/password'] ? classes.error : ''}`}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={updateInputValueHandler.bind(this, 'password')}/>
        </div>
        { !isLogin &&
          <div className={`${classes.control} ${errors && errors['data/confirmPassword'] ? classes.error : ''}`}>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <input type='password' id='confirmPassword' onChange={updateInputValueHandler.bind(this, 'confirmPassword')}/>
          </div>
        }
        <div className={classes.actions}>
          <div className={classes.btn} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </div>
          <button>{isLogin ? 'Log in' : 'Sign up'}</button>
        </div>
      </form>
    </Card>
  );
}

export default AuthForm;