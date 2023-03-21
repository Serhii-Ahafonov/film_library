import { storeTokenInCookie } from '../utils/cookies';

export async function authenticate(mode, authData) {
  const url = 'http://localhost:8000/api/v1/';

  const response = await fetch(url + mode, {
    method: 'POST',
    body: JSON.stringify(authData),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const { token } = await response.json();

  storeTokenInCookie(token);

  return token;
}

export function signUp(authData) {
  return authenticate('users', authData);
}

export function logIn(authData) {
  return authenticate('sessions', authData);
}