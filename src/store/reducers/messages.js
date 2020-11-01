import { ADD_MESSAGE, SET_MESSAGES, UPDATE_MESSAGES } from '../actions/messages';

const initialState = [
    { userId: 'Discord Ripoff Bot', message: 'This channel is empty. Say something!' }
];

const messagesReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case UPDATE_MESSAGES: {
            return [...action.messages];
        }
        // Adds a single message to the state.channelId array.
        case ADD_MESSAGE: {
            const { message } = action;
            const { oldMessages } = state[message.channelId]
                ? state[message.channelId]
                : [];
            return {
                ...state,
                [message.channelId]: [...oldMessages, message]
            };
        }
        // Sets all messages for a channel. Used on first load.
        case SET_MESSAGES: {
            const { messages, channel } = action;
            return {
                ...state,
                [channel.id]: [...messages]
            };
        }
        default: {
            return state;
        }
    }
};

export default messagesReducer;
