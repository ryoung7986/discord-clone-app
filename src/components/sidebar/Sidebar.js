import React, { useState, } from "react"
import { useSelector, useDispatch } from 'react-redux';
import "./Sidebar.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from "./SidebarChannel";
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { setCurrentChannel } from '../../store/actions/channels';

function Sidebar() {
    const [loaded, setLoaded] = useState(false);
    const currentChannel = useSelector(state => state.servers.currentChannel.channel);
    const joinedChannels = useSelector(state => state.servers.joinedChannels);
    const dispatch = useDispatch();

    // if (!currentChannel) {
    //     dispatch(setCurrentChannel())
    // }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                {/* <h3>{currentChannel.channelName ? currentChannel.channelName : 'Select a Channel'}</h3> */}
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                        <ul>
                            {joinedChannels.map(channel => {
                                return (
                                    <li onClick={() => { dispatch(setCurrentChannel(channel.id)) }}>
                                        {`# ${channel.channelName}`}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <AddIcon className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">

                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar />
                <div className="sidebar__profileInfo">
                    <h3>Ryan Young</h3>
                    <p>#ID Number</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
