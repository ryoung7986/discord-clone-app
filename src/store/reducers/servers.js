import {
    LOAD_SERVERS,
    ADD_MESSAGE,
    SET_MESSAGES,
    UPDATE_MESSAGES,
    ADD_JOINED_CHANNEL,
    SET_CURRENT_CHANNEL,
    ADD_CHANNELS,
    SET_DEFAULT_CHANNELS,
    SET_USER_CHANNELS
} from '../actions/servers';

const initialState = {
    currentChannel: [],
    joinedChannels: []
};

export default function reducer(state = initialState, action) {
    Object.freeze(state);
    switch (action.type) {
        case LOAD_SERVERS: {
            return {
                ...state,
                servers: action.servers
            }
        }
        case SET_USER_CHANNELS: {
            return {
                ...state,
                joinedChannels: action.channels
            }
        }
        case ADD_CHANNELS: {
            return {
                ...state,
                channels: { ...state.channels, ...action.channels }
            };
        }
        case SET_DEFAULT_CHANNELS: {
            return {
                ...state,
                joinedChannels: [...action.userChannels],
            };
        }
        case SET_CURRENT_CHANNEL: {
            return {
                ...state,
                currentChannel: action.channel
            };
        }
        case ADD_JOINED_CHANNEL: {
            return {
                ...state,
                joinedChannels: [...state.joinedChannels, ...action.channel],
            };
        }
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
        default:
            return state;
    }
}
