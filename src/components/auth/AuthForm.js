import React, { useEffect, useState } from 'react';
import classes from './AuthForm.module.css';
import Card from '../ui/Card';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { LOGIN_INPUTS, SIGNUP_INPUTS } from '../constants';
import Input from '../ui/Input';

function AuthForm({ isLogin, onSubmit }) {
  const { errors } = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState({
    email: { value: '', isValid: true },
    name: { value: '', isValid: true },
    password: { value: '', isValid: true },
    confirmPassword: { value: '', isValid: true }
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const INPUTS = isLogin ? LOGIN_INPUTS : SIGNUP_INPUTS;

  useEffect(() => {
    if (errors) {
      setInputs((currInputs) => {
        const prefix = isLogin ? '' : 'data/';
        return {
          email: {value: currInputs.email.value, isValid: !errors[prefix + 'email']},
          name: {value: currInputs.name.value, isValid: !errors[prefix + 'name']},
          password: {value: currInputs.password.value, isValid: !errors[prefix + 'password']},
          confirmPassword: {value: currInputs.confirmPassword.value, isValid: !errors[prefix + 'confirmPassword']}
        };
      });
    }
  }, [errors]);

  const updateInputValueHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue.target.value, isValid: true }
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({
      email: inputs.email.value,
      name: inputs.name.value,
      password: inputs.password.value,
      confirmPassword: inputs.confirmPassword.value,
    });
  };

  const switchAuthModeHandler = () => {
    dispatch(authActions.setError(false));
    history.push(isLogin ? 'signup' : 'login');
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        {
          Object.keys(INPUTS).map(key => (
            <Input
              name={key}
              type={INPUTS[key].type}
              title={INPUTS[key].name}
              isValid={!inputs[key].isValid}
              onChangeHandler={updateInputValueHandler}
            />
          ))
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