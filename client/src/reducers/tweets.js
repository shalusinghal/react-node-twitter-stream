const tweets = (state = [], action) => {
    switch (action.type) {
        case 'NEW_TWEET':
            return [
                action.tweet,
                ...state
            ];
        default:
            return state;
    }
};

export default tweets;