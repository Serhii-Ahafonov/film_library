import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = ReactDOM.createRoot(document.getElementById('app-root'));

rootElement.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);
