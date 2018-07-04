import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

class Tweets extends Component {
    constructor(props) {
        super(props);

        // We use local state so that we can delay rendering to, say 1 second. This 
        // improves rendering, compared to rendering on every incoming tweet
        this.state = { tweets : [] };
    }

    componentDidMount () {
        setInterval(() => {
            this.setState({
                tweets: this.props.tweets
            });
        }, 2000)
    }
 
    linkify (tweet) {
        // Source: https://gist.github.com/fideloper/1302691
        let markedTweet = tweet.full_text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&?/.=]+/g, (url) => { 
            const wrap = document.createElement('div');
            const anch = document.createElement('a');
            anch.href = url;
            anch.target = "_blank";
            anch.innerHTML = url;
            wrap.appendChild(anch);
            return wrap.innerHTML;
        });

        markedTweet = markedTweet.replace(/(^|\s)@(\w+)/g, '$1@<a href="http://www.twitter.com/$2" target="_blank">$2</a>');

        return markedTweet.replace(/(^|\s)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');
    }

    render() {
        if (this.state.tweets.length === 0) {
            return <div className="text-center">Waiting for tweets...</div>;
        }
        else {
            let renderTweets = this.state.tweets.map((tweet, index) => {
                return <div className="card tweet" key={ tweet.id }>
                    <div className="card-body" dangerouslySetInnerHTML={ { __html: this.linkify(tweet) } }>
                    </div>
                </div>
            });

            return (
                <div className="tweets">
                    <CSSTransitionGroup
                      transitionName="fade"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={0}>
                      { renderTweets }
                    </CSSTransitionGroup>
                </div>
            )
        }
    }
}

export default Tweets;