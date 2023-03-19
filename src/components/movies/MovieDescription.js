import React from 'react';
import Card from '../UI/Card';
import classes from './MovieDescription.module.css';

const MovieDescription = (props) => {
  return (
    <Card>
      <h2 className={classes.title}>{props.movie[0].title}</h2>
      <div className={classes.section}>
        <label htmlFor='releaseDetail'>Release Date: </label>
        <div id='releaseDetail'>{props.movie[0].year}</div>
      </div>
      <div className={classes.section}>
        <label htmlFor='formatDetail'>Format: </label>
        <div id='format'>{props.movie[0].format}</div>
      </div>
      <div className={classes.section}>
        <label htmlFor='actorsDetail'>Cast: </label>
        <div id='actorsDetail'>{props.movie[0].actors.join(',')}</div>
      </div>
    </Card>
  );
};

export default MovieDescription;
