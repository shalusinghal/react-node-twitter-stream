import { connect } from 'react-redux';
import Tweets from '../tweets/Tweets';

const mapStateToProps = (state) => ({
    tweets: state.tweets
});

export default connect(
    mapStateToProps
)(Tweets);