import { SET_TOKEN, REMOVE_TOKEN } from '../actions/authentication';

const initialState = {
    token: "",
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

        default:
            return state;
    }
}
