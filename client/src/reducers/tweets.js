const tweets = (state = [], action) => {
    switch (action.type) {
        case 'NEW_TWEET':
            let newState = [
                action.tweet,
                ...state
            ];

            // Allow max 1000 tweets at a time to reduce page getting unresponsive
            return newState.slice(0, 100);
        default:
            return state;
    }
};

export default tweets;