import stemmer from 'porter-stemmer';

const wordFreq = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_WORD_FREQ':
            let r = freqCounter(state, action.tweet.full_text);
            // console.log(Object.keys(r).length);
            return r;
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
    const words = text.split(/[^A-Za-zéÉ'’_\-0-9@.]+/);

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
        if (!word || word.length < 4) {
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

    // Push each "stem" into terms as word
    for (let stem in stems) {
        let term = stems[stem].word;

        if (!(term in state)) {
            state[term] = stems[stem].count;
        }
        else {
            state[term] += stems[stem].count;
        }
    }

    return state;
};

export default wordFreq;