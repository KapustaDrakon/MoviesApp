import React from 'react';
import { Row } from 'antd';

//import { MoviesListItem } from '../MoviesListItem';
import { MoviesRatedItem } from '../MoviesRatedItem';

import './MoviesRated.css';

export default class MoviesRated extends React.Component {
  render() {
    const { moviesRated, onChangeRate, rated } = this.props;

    return (
      <div className="movies-rated__container">
        <ul className="movies-rated">
          <Row className="movies-rated__row">
            {moviesRated.map((movie) => {
              return <MoviesRatedItem movie={movie} key={movie.id} onChangeRate={onChangeRate} rated={rated} />;
            })}
          </Row>
        </ul>
      </div>
    );
  }
}
