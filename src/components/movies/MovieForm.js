import React, { useRef } from 'react';
import classes from './MovieForm.module.css';
import Card from '../ui/Card';

function MovieForm({ onAddMovie, onImport }) {
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const formatRef = useRef(null);
  const actorsRef = useRef(null);

  function addHandler(event) {
    event.preventDefault();

    // could add validation here...

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

    onImport(formData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={addHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='release'>Release Year</label>
          <input type='text' id='release' ref={yearRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='format'>Format</label>
          <input type='text' id='format' ref={formatRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='actors'>Actors</label>
          <textarea rows='2' id='actors' ref={actorsRef}/>
        </div>
        <div className={classes.actions}>
          <button>Add Movie</button>
        </div>
      </form>
      <div className={classes.import}>
        <label htmlFor="upload-movies">Import Movies...</label>
        <input
          id="upload-movies"
          name="movies"
          type="file"
          accept=".txt"
          onChange={importHandler}
        />
      </div>
    </Card>
  );
}

export default MovieForm;
