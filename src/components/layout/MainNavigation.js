import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Header, ListContainer, LogoImage, ListItem } from '../../styles/styled-components/MainNavigation';

const MainNavigation = () => {
  return (
    <Header>
      <LogoImage src={logo} alt="logo" />
      <nav>
        <ListContainer>
          <ListItem>
            <NavLink to="/movies" activeStyle={{color: '#e6fcfc'}}>
              All Movies
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/new-movie" activeStyle={{color: '#e6fcfc'}}>
              Add a Movie
            </NavLink>
          </ListItem>
        </ListContainer>
      </nav>
    </Header>
  );
};

export default MainNavigation;