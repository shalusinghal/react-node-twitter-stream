import stemmer from 'porter-stemmer';

const wordFreq = (state = {}, action) => {
    switch (action.type) {
        case 'NEW_TWEET':
            return freqCounter(state, action.tweet.full_text);
        case 'TRIM_TAGS':
            return trimTags(state);
        default:
            return state;
    }
};

// Common words what are not supposed to be part of the cloud
const stopWords = [
    'i','a','about', 'an','and','are','as','at',
    'be', 'been','by','com','for', 'from','how','in',
    'is','it','not', 'of','on','or','that',
    'the','this','to','was', 'what','when','where', 'which',
    'who','will','with', 'www','the',
    'we', 'us', 'our', 'ours',
    'they', 'them', 'their', 'he', 'him', 'his',
    'she', 'her', 'hers', 'it', 'its', 'you', 'yours', 'your',
    'has', 'have', 'would', 'could', 'should', 'shall',
    'can', 'may', 'if', 'then', 'else', 'but',
    'there', 'these', 'those', 'https', 't.co', 'rt'
];

// Help from: https://github.com/timdream/wordfreq/blob/master/src/wordfreq.worker.js
const freqCounter = (state, text) => {
    const stems = Object.create(null);

    // Remove characters that do not belong to a word
    const words = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&?/.=]+/g, '') // Remove URLs
        .split(/[^A-Za-zéÉ'’_\-0-9@.]+/);

    words.forEach((word) => {
        word = word
            .toLowerCase()
            .replace(/\.+/g, '.') // Replace multiple full stops
            .replace(/(.{3,})\.$/g, '$1') // Replace single trailing stop
            .replace(/n['’]t\b/ig, '') // Get rid of ~n't
            .replace(/['’](s|ll|d|ve)?\b/ig, ''); // Get rid of ’ and '

        // Skip mentions
        if (word.charAt(0) === '@') {
            return;
        }

        // Skip if the word is shorter than 4 characters
        if (!word || word.length < 3) {
            return;
        }

        // Word should have atleast one alphabet
        if (/^[0-9.@-]+$/.test(word)) {
            return;
        }

        // Skip if this is a stop word
        if (stopWords.indexOf(word.toLowerCase()) !== -1) {
            return;
        }

        // https://tartarus.org/martin/PorterStemmer/
        const stem = stemmer.stemmer(word).toLowerCase();

        // Count stems
        if (!(stem in stems)) {
            stems[stem] = { count: 0, word: word };
        }

        stems[stem].count++;

        // If the current word representing the stem is longer than
        // this one, use this word instead (booking -> book)
        if (word.length < stems[stem].word.length) {
            stems[stem].word = word;
        }

        // If the current word representing the stem is of the same
        // length but with different form,
        // use the lower-case representation (Book -> book)
        if (word.length === stems[stem].word.length && word !== stems[stem].word) {
            stems[stem].word = word.toLowerCase();
        }
    });

    // When we are limiting number of tags, we use time to remove oldest tags first
    const time = (new Date()).getTime();

    // Push each "stem" into terms as word
    for (let stem in stems) {
        let term = stems[stem].word;

        if (!(term in state)) {
            state[term] = { count: stems[stem].count };
        }
        else {
            state[term].count += stems[stem].count;
        }

        state[term].time = time; 
    }

    return state;
};

const trimTags = (state) => {
    // Convert to array
    const tagArr = Object.keys(state).map((key) => {
        return {
            key,
            count: state[key].count,
            time: state[key].time
        };
    });

    // Sort by count and then by time
    const sortedArr = tagArr.sort((a, b) => {
        if (a.count !== b.count) {
            return b.count - a.count;
        }
        else {
            return b.time - a.time;
        }
    });

    // Keep first 500 tags. This way we have 500 most frequent tags. If tags have same count,
    // those that appeared earlier get removed first
    const trimedArr = sortedArr.slice(0, 500);

    const newState = {};

    trimedArr.forEach((item) => {
        newState[item.key] = {
            count: item.count,
            time: item.time
        };
    });

    return newState;
}

export default wordFreq;