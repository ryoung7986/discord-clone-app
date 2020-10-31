import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import getMessages from './store/reducers/messages';

const token = window.localStorage.getItem('discordClone/authentication/token');
const email = window.localStorage.getItem('discordClone/authentication/SET_EMAIL_VALUE');

const store = configureStore({ authentication: { token, email } });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
