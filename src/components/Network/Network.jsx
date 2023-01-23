import './Network.css';

export default function Network({ onNetworkState }) {
  window.onoffline = () => {
    onNetworkState();
  };
  window.ononline = () => {
    onNetworkState();
  };
}
