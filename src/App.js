import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import { loadToken } from './store/actions/authentication'

const App = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          path='/'
          exact={true}
          render={() => (
            <Home />
          )} />
        <Route path='/login' exact={true} component={LoginForm} />
        <Route path='/signup' exact={true} component={SignUpForm} />
      </Switch>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  const isLoggedIn = useSelector(state => state.authentication.token);
  const dispatch = useDispatch();
  return <App isLoggedIn={isLoggedIn} loadToken={() => dispatch(loadToken())} />;
}

export default AppContainer;
