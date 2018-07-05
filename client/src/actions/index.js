export const newTweet = (tweet) => ({
    type: 'NEW_TWEET',
    tweet
});

export const trimTags = () => ({
    type: 'TRIM_TAGS'
});