import { UPDATE_MESSAGES } from '../actions/messages';

const initialState = [
    { userId: 'Discord Ripoff Bot', message: 'This channel is empty. Say something!' }
];

export default function reducer(state = initialState, action) {
    // debugger;
    switch (action.type) {
        case UPDATE_MESSAGES: {
            return [...action.messages];
        }
        default: {
            return state;
        }
    }
}
