import { ADD_JOINED_CHANNEL, SET_CURRENT_CHANNEL, ADD_CHANNELS, SET_DEFAULT_CHANNELS } from '../actions/channels';

const initialState = {
    currentChannel: [],
    joinedChannels: []
};

const channelsReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ADD_CHANNELS:
            return {
                ...state,
                channels: action.channels
            };
        case SET_DEFAULT_CHANNELS:
            return {
                ...state,
                joinedChannels: action.userChannels,
            };
        case SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.channel
            };
        case ADD_JOINED_CHANNEL:
            return {
                ...state,
                joinedChannels: [...state.joinedChannels, ...action.channel],
            };
        default:
            return state;
    }
};

export default channelsReducer;


// Shape of state:
// {
//     channels: [
//         {
//             id: ...,
//             channelName: ...,
//             serverId: ...,
//             userId: ...,
//             updatedAt: ...,
//             createdAt: ...,
//         },
//         ...
//     ],
//     joinedChannels: [<channelId>, ...],
//     currentChannel: <channelId>
// }
