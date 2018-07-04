import { connect } from 'react-redux';
import HeatMap from '../map/HeatMap';

const mapStateToProps = (state) => ({
    heatMap: state.heatMap
});

export default connect(
    mapStateToProps
)(HeatMap);