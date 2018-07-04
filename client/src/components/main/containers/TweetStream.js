import { Component } from 'react';
import { connect } from 'react-redux';
import { newTweet, updateHeatMap, updateWordFreq } from '../../../actions';

import io from 'socket.io-client';

class TweetStream extends Component {
    componentDidMount () {
        const socket = io('http://localhost:8000', { transports: ['websocket', 'polling'] });

        socket.on('connect', () => {
            console.log('Socket Connected');

            socket.on('tweets', (data) => {
                this.props.newTweet(data);
                this.props.updateHeatMap(data);
                this.props.updateWordFreq(data);
            });
        });

        socket.on('disconnect', () => {
            socket.off('tweets');
            socket.removeAllListeners('tweets');
            console.log('Socket Disconnected');
        });
    }

    render () {
        return null;
    }
}

const mapDispatchToProps = {
    newTweet,
    updateHeatMap,
    updateWordFreq
};


export default connect(null, mapDispatchToProps)(TweetStream);