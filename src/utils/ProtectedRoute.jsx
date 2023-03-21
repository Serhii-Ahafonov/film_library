import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { retrieveTokenFromCookie } from './cookies';

export const ProtectedRoute = ({ children, path }) => {
  const isAuthenticated = retrieveTokenFromCookie();
  return (
    <Route path={path} render={() => isAuthenticated ? children : <Redirect to='/login' />} />
  );
};
