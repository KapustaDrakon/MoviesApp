import './Network.css';
import PropTypes from 'prop-types';

export default function Network({ onNetworkState }) {
  Network.defaultProps = {
    onNetworkState: () => {},
  };

  Network.propTypes = {
    onNetworkState: PropTypes.func,
  };

  window.onoffline = () => {
    onNetworkState();
  };
  window.ononline = () => {
    onNetworkState();
  };
}
