import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './NoMoviesFound.module.css';
import { useDispatch } from 'react-redux';
import { addMovies } from '../../store/movies';

function NoMoviesFound() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const movieArray = event.target.result.split('\n\n');
      const newMovies = movieArray.map(movie => {
        const [title, year, format, actors] = movie.split('\n').map(item => {
          const [beforeStr, afterStr] = item.split(': ');
          return afterStr;
        });
        return { title, format, year, actors: actors.split(',')};
      });

      dispatch(addMovies(newMovies));
    };

    reader.readAsText(file);
    history.push('/movies')
  };

  return (
    <div className={classes.nomovies}>
      <p>No movies found!</p>
      <div className={classes.buttons}>
        <button onClick={() => history.push('/new-movie')}>
          Add a Movie
        </button>
        <button >
          <label htmlFor="upload-movies">Import Movies...</label>
          <input
            id="upload-movies"
            name="movies"
            type="file"
            accept=".txt"
            onChange={handleFileSelect}
          />
        </button>
      </div>
    </div>
  );
}

export default NoMoviesFound;