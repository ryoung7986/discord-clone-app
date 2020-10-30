import { baseUrl } from '../../config/config';

export const TOKEN_KEY = 'discordClone/authentication/token';
export const SET_TOKEN = 'discordClone/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'discordClone/authentication/REMOVE_TOKEN';
export const UPDATE_EMAIL_VALUE = 'discordClone/authentication/UPDATE_EMAIL_VALUE';

export const updateEmailValue = (value) => ({ type: UPDATE_EMAIL_VALUE, value });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        console.log(response);
    }

    if (response.ok) {
        const { token } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token));
    }
};

export const logout = () => async (dispatch, getState) => {
    const {
        authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/session`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
    }
};
