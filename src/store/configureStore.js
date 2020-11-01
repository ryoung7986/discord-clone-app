import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authentication from './reducers/authentication';
import messages from './reducers/messages';
import channels from './reducers/channels';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = composeWithDevTools({ trace: true });

const reducers = combineReducers({
    authentication,
    messages,
    channels
});

const configureStore = (initialState) => {
    return createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
};

export default configureStore;
