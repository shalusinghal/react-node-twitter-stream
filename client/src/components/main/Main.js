import React, { Component } from 'react';
import TweetStream from './containers/TweetStream';
import TweetList from './containers/TweetList';
import HeatMapContainer from './containers/HeatMapContainer';
import './main.css';

class Main extends Component {
    render() {
        return (
            <main role="main" className="container-fluid">
              <div className="main-container">
                <p className="lead">Please wait for a few minutes for HeatMap to populate. Not all tweets have location data.</p>
                <div className="row">
                    <div className="col-md-6">
                        <h1>Tweets</h1>
                        <TweetStream/>
                        <TweetList/>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>HeatMap</h1>
                                <HeatMapContainer/>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </main>
        );
    }
}

export default Main;