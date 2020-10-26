import React from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';

function Message() {
    return (
        <div className="message">
            <Avatar />
            <div className="message__info">
                <h4>
                    Ryan Young
                    <span className="message__timestamp">Timestamp</span>
                </h4>

                <p>Message Field</p>
            </div>
        </div>
    )
}

export default Message
