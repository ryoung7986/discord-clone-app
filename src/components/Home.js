import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './chat/Chat';
import Sidebar from './sidebar/Sidebar';
import Grid from '@material-ui/core/Grid'


function Home() {
    return (
        <Grid container direction="row">
            <Sidebar />
            <Chat />
        </Grid>
    )
}

export default Home
