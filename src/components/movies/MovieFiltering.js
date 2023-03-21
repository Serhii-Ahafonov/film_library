import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faArrowUpAZ, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classes from './MovieFiltering.module.css';

function MovieFiltering({onChange, isSortingAscending, value, onSearch}) {
  return (
    <div className={classes.sorting}>
      <div onClick={onChange}>
        {isSortingAscending
          ? <FontAwesomeIcon icon={faArrowUpAZ} size='2x' color='white'/>
          : <FontAwesomeIcon icon={faArrowDownAZ} size='2x' color='white'/>
        }
      </div>
      <div className={classes.input}>
        <input
          type="text"
          value={value}
          placeholder='Search...'
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </div>
      </div>
    </div>
  );
}

export default MovieFiltering