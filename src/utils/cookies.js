import { setCookie, parseCookies } from 'nookies';

export function storeTokenInCookie(token) {
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
}

export function retrieveTokenFromCookie() {
  const cookies = parseCookies();
  const token = cookies.token;

  return token;
}