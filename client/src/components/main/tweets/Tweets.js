import React, { Component } from 'react';

class Tweets extends Component {
    componentDidMount() {
        
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
        if (this.props.tweets.length === 0) {
            return <div className="text-center">Waiting for tweets...</div>;
        }
        else {
            let tweetList = this.props.tweets.map((tweet, index) => {
                return <div className="card" key={ index }>
                    <div className="card-body" dangerouslySetInnerHTML={ { __html: this.linkify(tweet) } }>
                    </div>
                </div>
            });

            return (
                tweetList
            );
        }
    }
}

export default Tweets;