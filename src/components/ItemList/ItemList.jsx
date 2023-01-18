import React from 'react';
import { format } from 'date-fns';
import { Row, Col, Card } from 'antd';

import './ItemList.css';

export default class ItemList extends React.Component {
  render() {
    const { movies } = this.props;

    return (
      <div className="movies__container">
        <ul className="movies">
          <Row className="movies__row">
            {movies.map((movie) => {
              let text = movie.overview.split(' ', 40).join(' ');
              text = text.trim() + ' ...';

              return (
                <Col span={12} key={movie.id}>
                  <li className="movie" key={movie.id}>
                    <div className="movie__view">
                      <img
                        className="movie__image"
                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                      ></img>
                      <Card className="movie__inf">
                        <div className="movie__inf-title">
                          <span className="movie__title">{movie.title}</span>
                          <span className="movie__date-release">
                            {format(new Date(movie.release_date), 'MMMM dd, yyyy')}
                          </span>
                          <span className="movie__genre">Genre</span>
                        </div>
                        <p className="movie__overview">{text}</p>
                      </Card>
                    </div>
                  </li>
                </Col>
              );
            })}
          </Row>
        </ul>
      </div>
    );
  }
}
