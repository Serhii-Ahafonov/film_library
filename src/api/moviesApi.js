import { retrieveTokenFromCookie } from '../utils/cookies';
import { importMovies, addMovies, replaceMovies, setLoading, removeMovie, setError } from '../store/movies';

const token = retrieveTokenFromCookie();
const url = process.env.API_URL + '/movies';

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

      if (!response.ok) {
        throw new Error(`Could not fetch data - please try again later!`)
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(JSON.stringify(data.error))
      }

      return data;
    }

    try {
      const { data } = await fetchData();
      dispatch(replaceMovies(data));
    } catch (error) {
      const errorObject = JSON.parse(error.message);
      if (errorObject.code === 'MOVIE_NOT_FOUND') dispatch(setError({message: 'Movie not found!'}));
    }
  };
}

export function sendMovies(movies) {
  return async dispatch => {
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

      const data = await response.json();

      if (data.error) {
        throw new Error(JSON.stringify(data.error))
      }

      return data;
    }

    try {
      const { data } = await sendData();
      dispatch(addMovies(data));
    } catch (error) {
      const errorObject = JSON.parse(error.message);
      if (errorObject.code === 'FORMAT_ERROR') dispatch(setError(errorObject.fields));
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

      if (!response.ok) {
        throw new Error(`Could not delete data - please try again later!`)
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(JSON.stringify(data.error))
      }

      return data;
    }

    try {
      await sendData();
      dispatch(removeMovie(id));
    } catch (error) {
      const errorObject = JSON.parse(error.message);
      if (errorObject.code === 'MOVIE_NOT_FOUND') dispatch(setError({message: 'Movie not found!'}));
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

      if (!response.ok) {
        throw new Error(`Could not import movies - please try again later!`)
      }

      return await response.json();
    }

    try {
      const { data } = await sendData();
      dispatch(importMovies(data));
    } catch (error) {
      dispatch(setError({message: error.message}));
    }
  };
}