import React from 'react';
import Card from '../ui/Card';
import classes from './MovieDescription.module.css';

const MovieDescription = ({title, year, format, actors}) => {
  return (
    <Card>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.section}>
        <label htmlFor='releaseDetail'>Release Date: </label>
        <div id='releaseDetail'>{year}</div>
      </div>
      <div className={classes.section}>
        <label htmlFor='formatDetail'>Format: </label>
        <div id='format'>{format}</div>
      </div>
      { actors &&
        <div className={classes.section}>
          <label htmlFor='actorsDetail'>Actors: </label>
          <ul>
            {actors.map(actor => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      }
    </Card>
  );
};

export default MovieDescription;
