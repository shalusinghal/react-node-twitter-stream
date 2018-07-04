import React from 'react';
import { connect } from 'react-redux';
import { newTweet } from '../../../actions';
import io from 'socket.io-client';

const TweetStream = ({ dispatch }) => {
    const socket = io('http://localhost:8000', { transports: ['websocket', 'polling'] });

    socket.on('connect', () => {
        console.log('Socket Connected');

        socket.on('tweets', (data) => {
            dispatch(newTweet(data));
        });
    });

    socket.on('disconnect', () => {
        socket.off('tweets');
        socket.removeAllListeners('tweets');
        console.log('Socket Disconnected');
    });

    return (<div></div>);
}

export default connect()(TweetStream);