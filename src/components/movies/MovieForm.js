import React, { useRef } from 'react';
import classes from './MovieForm.module.css';
import Card from '../UI/Card';

function MovieForm(props) {
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const formatRef = useRef(null);
  const actorsRef = useRef(null);

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      year: yearRef.current.value,
      format: formatRef.current.value,
      actors: actorsRef.current.value.split(','),
    };

    props.onAddMovie(movie);
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
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
          <label htmlFor='actors'>Stars</label>
          <textarea rows='2' id='actors' ref={actorsRef}/>
        </div>
        <div className={classes.actions}>
          <button>Add Movie</button>
        </div>
      </form>
    </Card>
  );
}

export default MovieForm;
