import React from 'react';
import { Alert } from 'antd';

import './ErrorMessage.css';

export default class ErrorMessage extends React.Component {
  render() {
    const { error } = this.props;
    if (error) {
      return (
        <Alert
          type="error"
          className="error-message"
          message="Ошибка сети!"
          description="Не удалось загрузить список фильмов."
          closable
        ></Alert>
      );
    }
  }
}
