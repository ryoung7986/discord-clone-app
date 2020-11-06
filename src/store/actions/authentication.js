import { baseUrl } from '../../config/config';
import { setDefaultChannels, setUserServers } from './servers';
// import { addJoinedChannel, setDefaultChannels } from './channels';

export const TOKEN_KEY = 'discordClone/authentication/token';
export const SET_TOKEN = 'discordClone/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'discordClone/authentication/REMOVE_TOKEN';
export const USER_ID = 'discordClone/authentication/USER_ID';
export const SET_USER_ID = 'discordClone/authentication/SET_USER_ID';

export const setUserId = (value) => ({ type: SET_USER_ID, value });
export const removeToken = (token) => ({ type: REMOVE_TOKEN, token });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
        dispatch(setToken(token));
    }
};

export const signUp = (user) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/users`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (response.ok) {
        const token = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token));
    }
};

export const login = (email, password) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/users`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        console.log(response);
    }

    if (response.ok) {
        const { token, user } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem(USER_ID, user.id);
        dispatch(setToken(token));
        dispatch(setUserId(user.id));
        dispatch(setUserServers(user.id));
    }
};

export const logout = () => async (dispatch, getState) => {
    const {
        authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/users`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
    }
};
