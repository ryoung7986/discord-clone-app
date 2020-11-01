export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGE';

export const updateMessages = messages => ({ type: UPDATE_MESSAGES, messages });

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


// export const getMessages = () => {
//     return async (dispatch, getState) => {
//         const { auth: { token } } = getState();
//         const response = await fetch(`${baseUrl}/messages`, {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const messages = await response.json();
//         dispatch(updateMessages(messages))
//     };
// };
