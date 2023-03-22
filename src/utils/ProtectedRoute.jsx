import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { retrieveTokenFromCookie } from './cookies';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

export const ProtectedRoute = ({ children, path, exact }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = retrieveTokenFromCookie();
  const dispatch = useDispatch();

  if (!isAuthenticated && token) {
    dispatch(authActions.login());
  }

  return (
    <Route exact={exact} path={path} render={() => isAuthenticated ? children : <Redirect to='/login' />} />
  );
};
