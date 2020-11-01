import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import { loadToken, USER_ID } from './store/actions/authentication'
import { addMessage } from './store/actions/messages';
import { addJoinedChannels } from './store/actions/channels';
import SocketContext from './SocketContext';

const App = ({ isLoggedIn, socket, loadToken }) => {
  const [loaded, setLoaded] = useState(false);
  const currentChannel = useSelector(state => state.channels.currentChannel);
  const joinedChannels = useSelector(state => state.channels.joinedChannels);
  const dispatch = useDispatch();

  // Any time the current channel changes, send a 'join' message to the server.
  useEffect(() => {
    if (currentChannel) {
      console.log(`Joining ${currentChannel}`);
      socket.emit('join', currentChannel);
    }
  }, [currentChannel, socket]);

  // Sets up the listener for new socket connections.
  // It will just keep returning until there is a currentChannel
  // that isn't already listed in joinedChannels
  useEffect(() => {
    if (!currentChannel) return;
    if (joinedChannels.includes(currentChannel)) return;

    socket.on(currentChannel, (message) => {
      console.log(`Received new message for ${message.text}`);
      // If the current channel doesn't match the
      // channel the message belongs to, it doesn't display
      dispatch(addMessage(message));
    });
    dispatch(addJoinedChannels(currentChannel));
  }, [currentChannel, dispatch, joinedChannels, socket]);

  // When the 'send' button is clicked, emit a message across the socket for the currentChannel
  const onSend = message => {
    const userId = window.localStorage.getItem(USER_ID);
    console.log(`Sending message ${message} for User ID: ${userId} to ${currentChannel}`);
    socket.emit(currentChannel, {
      message,
      userId
    });
  }

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, []);

  if (!loaded) {
    return null;
  }

  const renderMessageView = () => {
    if (currentChannel) {
      return (
        <div className="message-view">
          {/* <MessageList />
          <SendMessageForm onSend={onSend} /> */}
        </div>
      );
    } else {
      return <h1>Choose a channel</h1>;
    }
  };

  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

const AppContainer = ({ socket }) => {
  const isLoggedIn = useSelector(state => state.authentication.token);
  const dispatch = useDispatch();
  return <App isLoggedIn={isLoggedIn} loadToken={() => dispatch(loadToken())} />;
}

export default AppContainer;
