import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { store } from './store/store';
import { ProtectedRoute } from './utils/ProtectedRoute';
import MainPage from './components/layout/MainPage';
import AllMovies from './pages/movies/AllMovies';
import MovieDetails from './pages/movies/MovieDetails';
import NewMovie from './pages/movies/NewMovie';
import NoMoviesFound from './components/movies/NoMoviesFound';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <MainPage>
        <Switch>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <Route path='/signup' exact>
            <SignUp/>
          </Route>
          <ProtectedRoute path='/' exact>
            <Redirect to='/movies' />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' exact>
            <AllMovies />
          </ProtectedRoute>
          <ProtectedRoute path='/movies/:movieId'>
            <MovieDetails />
          </ProtectedRoute>
          <ProtectedRoute path='/new-movie'>
            <NewMovie />
          </ProtectedRoute>
          <ProtectedRoute path='*'>
            <NoMoviesFound />
          </ProtectedRoute>
        </Switch>
      </MainPage>
    </Provider>
  );
}

export default App;