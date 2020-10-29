import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Chat from './components/chat/Chat';


const App = (props) => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <ProtectedRoute
        isLoggedIn={props.token}
        path='/'
        exact={true}
        render={() => (
          <Chat />
        )} />
      <Route path='/login' exact={true} component={LoginForm} />
      <Route path='/signup' exact={true} component={SignUpForm} />
    </Switch>
  </BrowserRouter>
);

const mapStateToProps = state => {
  return {
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(App);
