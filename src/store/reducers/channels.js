import { ADD_JOINED_CHANNELS, SET_CURRENT_CHANNEL, ADD_CHANNELS } from '../actions/channels';

const initialState = {
    channels: [],
    joinedChannels: []
};

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

const channelsReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ADD_CHANNELS:
            return { ...state, channels: action.channels };
        case SET_CURRENT_CHANNEL:
            return { ...state, currentChannel: action.channel };
        case ADD_JOINED_CHANNELS:
            return {
                ...state,
                joinedChannels: [...state.joinedChannels, ...action.channels],
            };
        default:
            return state;
    }
};

export default channelsReducer;
