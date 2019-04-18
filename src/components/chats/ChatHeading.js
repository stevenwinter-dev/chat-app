import React from 'react';
import { FaVideo } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';


export default function({name, numberOfUsers}) {
    const iconStyle = {
        cursor: 'pointer',
        fontSize: '2em',
        marginRight: '.75em'
    };

    return (
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name">{name}</div>
                <div className="status">
                    <div className="indicator"></div>
                    <span>{numberOfUsers ? numberOfUsers : null}</span>
                </div>
            </div>
            <div className="option">
                <FaVideo style={iconStyle} />
                <FaUserPlus style={iconStyle} />
                <MdMoreHoriz style={iconStyle} />
            </div>
        </div>
    );
}