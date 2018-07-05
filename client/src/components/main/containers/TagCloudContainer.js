import { connect } from 'react-redux';
import Cloud from '../tags/Cloud';
import { trimTags } from '../../../actions';

const mapStateToProps = (state) => ({
    wordFreq: state.wordFreq
});

const mapDispatchToProps = {
    trimTags
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cloud);