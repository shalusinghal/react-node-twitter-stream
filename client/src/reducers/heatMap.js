const heatMap = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_HEAT_MAP':
            if (action.tweet.place) {
            	if (state[action.tweet.place.country_code] !== undefined) {
            		state[action.tweet.place.country_code]++;
            	}
            	else {
            		state[action.tweet.place.country_code] = 1;
            	}
            }

            return state;
        default:
            return state;
    }
};

export default heatMap;