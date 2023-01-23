import React from 'react';
import { Row, Alert } from 'antd';

import { MoviesListItem } from '../MoviesListItem';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

import './MoviesList.css';

export default class ItemList extends React.Component {
  render() {
    const { movies, spin, error, network } = this.props;

    return (
      <div className="movies__container">
        <Spinner spin={spin} />
        <ErrorMessage error={error} />
        {network ? (
          <Alert
            type="error"
            className="network"
            message="Ошибка сети!"
            description="Проверьте подключение к интернету."
            closable
          />
        ) : null}
        <ul className="movies">
          <Row className="movies__row">
            {movies.map((movie) => {
              return <MoviesListItem movie={movie} key={movie.id} />;
            })}
          </Row>
        </ul>
      </div>
    );
  }
}
