import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from './reducers/authentication';
import messages from './reducers/messages';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    authentication,
    messages
});

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
};

export default configureStore;