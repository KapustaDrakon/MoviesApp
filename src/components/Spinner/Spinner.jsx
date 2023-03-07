import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import './Spinner.css';

export default class Spinner extends React.Component {
  render() {
    const { spin } = this.props;
    if (spin) {
      return <Spin size="large" className="spinner"></Spin>;
    }
  }
}

Spinner.defaultProps = {
  spin: false,
};

Spinner.propTypes = {
  spin: PropTypes.bool,
};
