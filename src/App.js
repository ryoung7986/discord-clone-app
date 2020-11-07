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
import { setUserServers, setUserChannels, addJoinedChannel, addMessage, addChannels } from './store/actions/servers';
import SocketContext from './SocketContext';

const App = ({ isLoggedIn, socket, loadToken }) => {
  const [loaded, setLoaded] = useState(false);
  const currentChannel = useSelector(state => state.servers.currentChannel.channel);
  const joinedChannels = useSelector(state => state.servers.joinedChannels);
  const userServers = useSelector(state => state.servers.servers);
  const userId = useSelector(state => state.authentication.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;
    if (userId) {
      dispatch(setUserServers(userId));
    }
  }, []);

  useEffect(() => {
    if (userServers) {
      const serverIds = userServers.map(a => a.id);
      console.log("SERVER IDS:", serverIds)
      serverIds.forEach(serverId => dispatch(setUserChannels(serverId)));
    }
  }, [userServers])

  useEffect(() => {
    if (currentChannel) {
      console.log(`Joining ${currentChannel}`);
      socket.emit('join', currentChannel);
    }
  }, [currentChannel, socket]);

  useEffect(() => {
    if (!currentChannel) return;
    if (joinedChannels.includes(currentChannel)) return;

    socket.on(currentChannel, (message) => {
      console.log(`Received new message for ${message.text}`);
      dispatch(addMessage(message));
    });

    dispatch(addJoinedChannel(currentChannel));
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
          <ProtectedRoute isLoggedIn={isLoggedIn} path='/' exact={true} component={Home} />
          <Route path='/login' exact={true} component={LoginForm} />
          <Route path='/signup' exact={true} component={SignUpForm} />
        </Switch>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  const isLoggedIn = useSelector(state => state.authentication.token);
  const dispatch = useDispatch();
  return <App
    isLoggedIn={isLoggedIn}
    loadToken={() => dispatch(loadToken())}

  />;
}

export default AppContainer;
