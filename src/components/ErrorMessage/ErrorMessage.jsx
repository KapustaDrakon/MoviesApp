import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

import './ErrorMessage.css';

export default class ErrorMessage extends React.Component {
  render() {
    const { error } = this.props;
    if (error) {
      return <Alert type="error" className="error-message" message="Совпадений не найдено"></Alert>;
    }
  }
}

ErrorMessage.defaultProps = {
  error: false,
};

ErrorMessage.propTypes = {
  error: PropTypes.bool,
};
