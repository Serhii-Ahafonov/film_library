import React from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaSearch  } from 'react-icons/fa';
import classes from './MovieFiltering.module.css';

function MovieFiltering({onChange, isSortingAscending, value, onSearch}) {
  return (
    <div className={classes.sorting}>
      <div onClick={onChange}>
        {isSortingAscending
          ? <FaSortAlphaUp size='24px' color='white'/>
          : <FaSortAlphaDown  size='24px' color='white'/>
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
          <FaSearch size='24px'/>
        </div>
      </div>
    </div>
  );
}

export default MovieFiltering