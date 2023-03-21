import { retrieveTokenFromCookie } from '../utils/cookies';
import { importMovies, addMovies, replaceMovies, setLoading, removeMovie, setError } from '../store/movies';

const token = retrieveTokenFromCookie();
const url = 'http://localhost:8000/api/v1/movies';

export function fetchMovies(params) {
  return async dispatch => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      const response = await fetch(url + (params || ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })

      if (response.error) {
        throw new Error(`Could not fetch movies ${response.error.code}.`)
      }

      return await response.json();
    }

    try {
      const { data } = await fetchData();
      dispatch(replaceMovies(data));
    } catch (error) {
      console.log(error);
      // dispatch(uiActions.showNotification({status: 'error', title: 'Error...', message: 'Fetching cart data failed.'}))
    }
  };
}

export function sendMovies(movies) {
  return async dispatch => {
    // dispatch(setLoading(true));
    const sendData = async () => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(movies),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })

      if (!response.ok) {
        throw new Error(`Could not save data - please try again later!`)
      }

      return await response.json();
    }

    try {
      const { data, error } = await sendData();
      console.log(data, !error)
      !error ? dispatch(addMovies(data)) : dispatch(setError(error.code));
      return error;
    } catch (error) {
      console.log(error);

      // dispatch(uiActions.showNotification({status: 'error', title: 'Error...', message: 'Fetching cart data failed.'}))
    }
  };
}

export function deleteMovie(id) {
  return async dispatch => {
    const sendData = async () => {
      const response = await fetch(url + '/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })

      if (response.error) {
        throw new Error(`Could not delete movie (${response.error.code}) - please try again later!`)
      }

      return await response.json();
    }

    try {
      await sendData();
      dispatch(removeMovie(id));
    } catch (error) {
      console.log(error);
      // dispatch(uiActions.showNotification({status: 'error', title: 'Error...', message: 'Fetching cart data failed.'}))
    }
  };
}

export function sendImportMovies(formData) {
  return async dispatch => {
    dispatch(setLoading(true));
    const sendData = async () => {
      const response = await fetch(url + '/import', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': token,
        }
      })

      if (response.error) {
        throw new Error(`Could not save data (${response.error.code}) - please try again later!`)
      }

      return await response.json();
    }

    try {
      const { data } = await sendData();
      dispatch(importMovies(data));
    } catch (error) {
      console.log(error);
      // dispatch(uiActions.showNotification({status: 'error', title: 'Error...', message: 'Fetching cart data failed.'}))
    }
  };
}