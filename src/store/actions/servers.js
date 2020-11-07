import { baseUrl } from '../../config/config';

export const SET_USER_SERVERS = 'discordClone/servers/SET_USER_SERVERS';
export const LOAD_SERVERS = 'discordClone/servers/LOAD_SERVERS';
export const UPDATE_MESSAGES = 'discordClone/servers/UPDATE_MESSAGES';
export const ADD_MESSAGE = 'discordClone/servers/ADD_MESSAGE';
export const SET_MESSAGES = 'discordClone/servers/SET_MESSAGE';
export const ADD_CHANNELS = 'ADD_CHANNELS';
export const SET_DEFAULT_CHANNELS = 'discordClone/authentication/SET_DEFAULT_CHANNELS';
export const SET_CURRENT_CHANNEL = 'discordClone/servers/SET_CURRENT_CHANNEL';
export const SET_CHANNEL = 'discordClone/servers/SET_CHANNEL';
export const ADD_JOINED_CHANNEL = 'discordClone/servers/ADD_JOINED_CHANNELS';
export const SET_USER_CHANNELS = 'discordClone/servers/SET_USER_CHANNELS';

export const loadServers = (servers) => ({ type: LOAD_SERVERS, servers });
export const updateMessages = messages => ({ type: UPDATE_MESSAGES, messages });

export const setUserChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/channels/${serverId}`);
    const userChannels = await response.json();
    console.log("SERVER ID:", serverId);
    console.log("USER CHANNELS:", userChannels);
    console.log("FUCKING RESPONSE FUCK:", response);
    dispatch(setDefaultChannels(userChannels));
}

export const setUserServers = (userId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/servers/${userId}`);
    const servers = await response.json();
    dispatch(loadServers(servers));
}

export const setCurrentChannel = (channelId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/channels/${channelId}`);
    const channel = await response.json();
    console.log("CHANNEL", channel)
    dispatch(setChannel(channel));
}

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


export const setChannel = (channel) => {
    return {
        type: SET_CHANNEL,
        channel
    };
}

export const addJoinedChannel = (channels) => {
    return {
        type: ADD_JOINED_CHANNEL,
        channels
    };
}

export const addMessage = message => {
    return ({
        type: ADD_MESSAGE,
        message
    });
}

export const setMessages = (messages, channel) => {
    return ({
        type: SET_MESSAGES,
        messages,
        channel
    })
}
