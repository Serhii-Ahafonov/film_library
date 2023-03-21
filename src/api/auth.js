import { storeTokenInCookie } from '../utils/cookies';
import { authActions } from '../store/auth';
import { setLoading } from '../store/movies';
const url = 'http://localhost:8000/api/v1/';

export function authenticate(mode, authData) {
  return async dispatch => {
    dispatch(setLoading(true));
    const auth = async () => {
      const response = await fetch(url + mode, {
        method: 'POST',
        body: JSON.stringify(authData),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) throw new Error(`Could not authenticate - please try again later!`);

      const data = await response.json();

      if (data.error) throw new Error(JSON.stringify(data.error));

      return data;
    }

    try {
      const {token} = await auth();
      storeTokenInCookie(token);
      dispatch(authActions.login());
    } catch (error) {
      const errorObject = JSON.parse(error.message);
      if (errorObject.code === 'EMAIL_NOT_UNIQUE') {
        dispatch(authActions.setError({message: 'Sorry user is already registered, please try another email!'}));
      }
      if (errorObject.code === 'AUTHENTICATION_FAILED') {
        dispatch(authActions.setError({message: 'Email or password is incorrect!'}));
      }
      if (errorObject.code === 'FORMAT_ERROR') dispatch(authActions.setError(errorObject.fields));
    }
  };
}

export function signUp(authData) {
  return authenticate('users', authData);
}

export function logIn(authData) {
  return authenticate('sessions', authData);
}