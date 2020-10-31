import { SET_TOKEN, REMOVE_TOKEN, SET_USER_ID } from '../actions/authentication';

const initialState = {
    token: "",
    email: ""
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            };
        }
        case REMOVE_TOKEN: {
            const newState = { ...state };
            delete newState.token;
            return newState;
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.userId
            }
        }
        default:
            return state;
    }
}
