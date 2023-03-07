import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import { MoviesListItem } from '../MoviesListItem';

import './MoviesList.css';

export default class MoviesList extends React.Component {
  render() {
    const { movies, onChangeRate } = this.props;

    return (
      <div className="movies__container">
        <ul className="movies">
          <Row className="movies__row">
            {movies.map((movie) => {
              return <MoviesListItem movie={movie} key={movie.id} onChangeRate={onChangeRate} />;
            })}
          </Row>
        </ul>
      </div>
    );
  }
}

MoviesList.defaultProps = {
  movies: [],
  onChangeRate: () => {},
};

MoviesList.propsTypes = {
  movies: PropTypes.array,
  onChangeRate: PropTypes.func,
};
