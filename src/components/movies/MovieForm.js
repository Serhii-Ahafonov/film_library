import React, { useRef } from 'react';
import classes from './MovieForm.module.css';

function MovieForm(props) {
  const titleRef = useRef(null);
  const releaseYearRef = useRef(null);
  const formatRef = useRef(null);
  const starsRef = useRef(null);

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      id: Math.random(),
      title: titleRef.current.value,
      releaseYear: releaseYearRef.current.value,
      format: formatRef.current.value,
      stars: starsRef.current.value,
    };

    props.onAddMovie(movie);
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='release'>Release Year</label>
          <input type='text' id='release' ref={releaseYearRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='format'>Format</label>
          <input type='text' id='format' ref={formatRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='stars'>Stars</label>
          <textarea rows='2' id='stars' ref={starsRef}/>
        </div>
        <div className={classes.actions}>
          <button>Add Movie</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
