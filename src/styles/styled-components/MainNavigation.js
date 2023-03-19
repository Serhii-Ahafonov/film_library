import styled from 'styled-components';

export const LogoImage = styled.img`
  height: 50px;
  padding: 10px 0px 0px 10px;
`;

export const Header = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  padding: 0 5%;
  justify-content: space-between;
  align-items: center;
`;

export const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;


export const ListItem = styled.li`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  
   & > a { 
    text-decoration: none;
    color: #DC1B27;
    
     &:hover,
     &:active {
      color: #e6fcfc;
     }
   }
`;

