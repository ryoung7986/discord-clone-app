import { baseUrl } from '../../config/config';

export const UPDATE_MESSAGES = 'discordClone/messages/UPDATE_MESSAGES';

export const updateMessages = messages => ({ type: UPDATE_MESSAGES, messages });

export const getMessages = () => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        const response = await fetch(`${baseUrl}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const messages = await response.json();
        dispatch(updateMessages(messages))
    };
};
