import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../api/auth';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const { errors, isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const onLoginHandler = (data) => {
    dispatch(logIn(data));
  };

  useEffect(() => {
    isAuthenticated && history.push('/movies');
  }, [isAuthenticated]);

  return (
    <Fragment>
      {errors && errors.message && <ErrorOverlay message={errors.message}/>}
      <AuthForm isLogin onSubmit={onLoginHandler}/>
    </Fragment>
);
}

export default Login;