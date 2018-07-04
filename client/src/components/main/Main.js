import React, { Component } from 'react';
import TweetStream from './containers/TweetStream';
import TweetList from './containers/TweetList';
import './main.css';

class Main extends Component {
    render() {
        return (
            <main role="main" className="container">
              <div className="main-container">
                <h1>Tweets</h1>
                <TweetStream/>
                <TweetList/>
              </div>
            </main>
        );
    }
}

export default Main;