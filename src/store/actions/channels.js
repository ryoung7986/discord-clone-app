export const ADD_CHANNELS = "ADD_CHANNELS";
export const SET_DEFAULT_CHANNELS = 'discordClone/authentication/SET_DEFAULT_CHANNELS';
export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
export const ADD_JOINED_CHANNEL = "ADD_JOINED_CHANNELs";

export const addChannels = (channels) => {
    return {
        type: ADD_CHANNELS,
        channels,
    };
}

export const setDefaultChannels = (userChannels) => {
    return {
        type: SET_DEFAULT_CHANNELS,
        userChannels
    }
}

export const setCurrentChannel = (channel) => {
    return {
        type: SET_CURRENT_CHANNEL,
        channel
    };
}

export const addJoinedChannel = (channels) => {
    return {
        type: ADD_JOINED_CHANNEL,
        channels
    };
}
