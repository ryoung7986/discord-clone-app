import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import getMessages from './store/reducers/messages';

const token = window.localStorage.getItem('discordClone/authentication/token');

const store = configureStore({ auth: { token } });
// store.dispatch(getMessages());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
