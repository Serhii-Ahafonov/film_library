import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { removeTokenFromCookie } from '../../utils/cookies';
import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.png';

const MainNavigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const Logout = () => {
    removeTokenFromCookie();
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      { isAuthenticated &&
        <nav>
          <ul className={ classes.list }>
            <li className={ classes.listItem }>
              <NavLink to="/movies" activeClassName={ classes.active }>
                All Movies
              </NavLink>
            </li>
            <li className={ classes.listItem }>
              <NavLink to="/new-movie" activeClassName={ classes.active }>
                Add a Movie
              </NavLink>
            </li>
            <li className={ classes.listItem } onClick={Logout}>
              <NavLink to="/login">
                Log out
              </NavLink>
            </li>
          </ul>
        </nav>
      }
    </header>
  );
};

export default MainNavigation;