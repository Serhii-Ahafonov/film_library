import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Card from '../ui/Card';
import classes from './MovieForm.module.css';

function MovieForm({ onAddMovie }) {
  const { errors } = useSelector((state) => state.allMovies);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const formatRef = useRef(null);
  const actorsRef = useRef(null);

  function addHandler(event) {
    event.preventDefault();
    const movie = {
      title: titleRef.current.value,
      year: yearRef.current.value,
      format: formatRef.current.value,
      actors: actorsRef.current.value.split(','),
    };

    onAddMovie(movie);
  }

  function importHandler(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("movies", file, file.name);

    onAddMovie(formData, true);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={addHandler}>
        <div className={`${classes.control} ${errors.title ? classes.error : ''}`}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleRef}/>
        </div>
        <div className={`${classes.control} ${errors.year ? classes.error : ''}`}>
          <label htmlFor='year'>Year</label>
          <input type='text' id='year' ref={yearRef}/>
        </div>
        <div className={`${classes.control} ${errors.format ? classes.error : ''}`}>
          <label htmlFor='format'>Format</label>
          <input type='text' id='format' ref={formatRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='actors'>Actors</label>
          <textarea rows='2' id='actors' ref={actorsRef}/>
        </div>
        <div className={classes.actions}>
          <div className={classes.import}>
            <label htmlFor="upload-movies">Import Movies...</label>
            <input id="upload-movies" name="movies" type="file" accept=".txt" onChange={importHandler}/>
          </div>
          <button>Add Movie</button>
        </div>
      </form>
    </Card>
  );
}

export default MovieForm;
