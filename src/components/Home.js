import React from 'react'
import ChatHeader from './chat/ChatHeader';
import Chat from './chat/Chat';
import Message from './chat/Message';

function Home() {
    return (
        <>
            <Chat />
            <ChatHeader />
            <Message />
        </>
    )
}

export default Home
