import { storeTokenInCookie } from '../utils/cookies';
import { authActions } from '../store/auth';
import { setLoading } from '../store/movies';
const url = process.env.API_URL;

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

      if (data.error) throw data.error;

      return data;
    }

    try {
      const { token } = await auth();
      storeTokenInCookie(token);
      dispatch(authActions.login());
    } catch (error) {
      if (error.code === 'EMAIL_NOT_UNIQUE') {
        dispatch(authActions.setError({message: 'Sorry user is already registered, please try another email!'}));
      }
      if (error.code === 'AUTHENTICATION_FAILED') {
        dispatch(authActions.setError({message: 'Email or password is incorrect!'}));
      }
      if (error.code === 'FORMAT_ERROR') dispatch(authActions.setError(error.fields));
    }
  };
}

export function signUp(authData) {
  return authenticate('/users', authData);
}

export function logIn(authData) {
  return authenticate('/sessions', authData);
}