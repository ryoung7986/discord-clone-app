import { SET_TOKEN, REMOVE_TOKEN, UPDATE_EMAIL_VALUE } from '../actions/authentication';

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
        case UPDATE_EMAIL_VALUE: {
            return {
                ...state,
                email: action.email
            }
        }
        default:
            return state;
    }
}
