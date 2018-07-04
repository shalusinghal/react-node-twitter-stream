const nconf = require('nconf');
const Twit = require('twit');
var io = require('socket.io')(8000);

// Load twitter keys from config files
nconf.file({ file: 'config.json' });

// New twitter instance
const twitter = new Twit({
    consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
    consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
    access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
    access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
});

const keywords = ['javascript'];

// Create tweet stream
const stream = twitter.stream('statuses/filter', { track:  keywords });

// When new tweet is recieved
stream.on('tweet', (tweet) => {
    // Get only useful props so as to reduce traffic
    const trimTweet = {
        id: tweet.id,
        text: tweet.text,
        full_text: (tweet.extended_tweet) ? tweet.extended_tweet.full_text : tweet.text,
        user: {
            id: tweet.user.id,
            name: tweet.user.name, 
            screen_name: tweet.user.screen_name
        },
        place: tweet.place
    };

    io.emit('tweets', trimTweet);

    console.log(tweet);
});