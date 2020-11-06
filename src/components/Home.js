import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './chat/Chat';
import Sidebar from './sidebar/Sidebar';


function Home() {
    return (
        <div className="main">
            <Chat />
            <Sidebar />
        </div>
    )
}

export default Home
