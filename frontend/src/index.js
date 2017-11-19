import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store/store';

import registerServiceWorker from './registerServiceWorker';

import './assets/css/index.css';
import './assets/css/App.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
);
registerServiceWorker();
