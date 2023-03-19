import styled from 'styled-components';
import background from '../../assets/movies-background.jpg';

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${background});
  background-size: cover;
`;

export const MainPageContent = styled.div`
  margin: 3rem auto;
  width: 90%;
  max-width: 40rem;
`;