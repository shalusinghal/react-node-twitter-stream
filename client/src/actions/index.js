export const newTweet = (tweet) => ({
    type: 'NEW_TWEET',
    tweet
});

export const updateHeatMap = (tweet) => ({
    type: 'UPDATE_HEAT_MAP',
    tweet
});

export const updateWordFreq = (tweet) => ({
    type: 'UPDATE_WORD_FREQ',
    tweet
});