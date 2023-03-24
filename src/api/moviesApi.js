import { retrieveTokenFromCookie } from '../utils/cookies';
import { importMovies, addMovies, replaceMovies, setLoading, removeMovie, setError } from '../store/movies';
import { setNotification } from '../store/notification';

const url = process.env.API_URL + '/movies';

export function fetchMovies(params) {
  return async dispatch => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      const response = await fetch(url + (params || ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retrieveTokenFromCookie(),
        }
      })

      if (!response.ok) {
        throw new Error(`Could not fetch data - please try again later!`)
      }

      const data = await response.json();

      if (data.error) throw (data.error);

      return data;
    }

    try {
      const { data, meta } = await fetchData();
      dispatch(replaceMovies({data, total: meta && meta.total}));
    } catch (error) {
      if (error.code === 'MOVIE_NOT_FOUND') dispatch(setError({message: 'Movie not found!'}));
    }
  };
}

export function sendMovies(movies) {
  return async dispatch => {
    dispatch(setNotification(false));
    const sendData = async () => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(movies),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retrieveTokenFromCookie(),
        }
      })

      if (!response.ok) {
        throw new Error(`Could not save data - please try again later!`)
      }

      const data = await response.json();

      if (data.error) throw (data.error);

      return data;
    }

    try {
      const { data, meta } = await sendData();
      dispatch(addMovies({data, total: meta.total}));
      dispatch(setNotification('Movie was added successfully!'));
    } catch (error) {
      if (error.code === 'FORMAT_ERROR') dispatch(setError(error.fields));
      if (error.code === 'MOVIE_EXISTS') dispatch(setError({ message: 'Sorry this movie already exists!' }));
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
          'Authorization': retrieveTokenFromCookie(),
        }
      })

      if (!response.ok) {
        throw new Error(`Could not delete data - please try again later!`)
      }

      const data = await response.json();

      if (data.error) throw (data.error);

      return data;
    }

    try {
      await sendData();
      dispatch(removeMovie(id));
    } catch (error) {
      if (error.code === 'MOVIE_NOT_FOUND') dispatch(setError({message: 'Movie not found!'}));
    }
  };
}

export function sendImportMovies(formData) {
  return async dispatch => {
    dispatch(setLoading(true));
    dispatch(setNotification(false));
    const sendData = async () => {
      const response = await fetch(url + '/import', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': retrieveTokenFromCookie(),
        }
      })

      if (!response.ok) {
        throw new Error(`Could not import movies - please try again later!`)
      }

      return await response.json();
    }

    try {
      const { data, meta } = await sendData();
      dispatch(importMovies({data, total: meta.total}));
      dispatch(setNotification('Movies were added successfully!'))
    } catch (error) {
      dispatch(setError({message: error.message}));
    }
  };
}