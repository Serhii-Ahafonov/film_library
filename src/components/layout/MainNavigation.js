import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <nav>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <NavLink to="/movies" activeClassName={classes.active}>
              All Movies
            </NavLink>
          </li>
          <li className={classes.listItem}>
            <NavLink to="/new-movie" activeClassName={classes.active}>
              Add a Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;