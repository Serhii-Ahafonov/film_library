import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Main.css';
import '../public/favicon.ico'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainPage from './components/layout/MainPage';
import AllMovies from './pages/AllMovies';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import NoMoviesFound from './components/movies/NoMoviesFound';
import { Provider } from 'react-redux';
import { store } from './store/store';

const rootElement = ReactDOM.createRoot(document.getElementById('app-root'));

rootElement.render(
  <BrowserRouter>
    <Provider store={store}>
      <MainPage>
        <Switch>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/movies' />
            </Route>
            <Route path='/movies' exact>
              <AllMovies />
            </Route>
            <Route path='/movies/:movieId'>
              <MovieDetails />
            </Route>
            <Route path='/new-movie'>
              <NewMovie />
            </Route>
            <Route path='*'>
              <NoMoviesFound />
            </Route>
          </Switch>
        </Switch>
      </MainPage>
    </Provider>
  </BrowserRouter>
);
