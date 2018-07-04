import { connect } from 'react-redux';
import Cloud from '../tags/Cloud';

const mapStateToProps = (state) => ({
    wordFreq: state.wordFreq
});

export default connect(
    mapStateToProps
)(Cloud);