import React from 'react';
import MainNavigation from './MainNavigation';
import { MainPageContainer, MainPageContent } from '../../styles/styled-components/MainPage';

const MainPage = (props) => {
  return (
    <MainPageContainer>
      <MainNavigation/>
      <MainPageContent>{props.children}</MainPageContent>
    </MainPageContainer>
  );
};

export default MainPage;