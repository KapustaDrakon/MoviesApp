import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Rate } from 'antd';
import { format } from 'date-fns';

import { MovieGenre } from '../MovieGenre';
import './MoviesListItem.css';
import { GetRequestConsumer } from '../../context/ContextService';

export default class MoviesListItem extends React.Component {
  state = {
    heigth: '',
    rows: 0,
  };

  changeColor(id) {
    const movieVoteColor = document.getElementById(id);
    if (movieVoteColor.textContent >= 7) {
      movieVoteColor.style.border = '2px solid #66E900';
    } else if (movieVoteColor.textContent < 7 && movieVoteColor.textContent >= 5) {
      movieVoteColor.style.border = '2px solid #E9D100';
    } else if (movieVoteColor.textContent < 5 && movieVoteColor.textContent >= 3) {
      movieVoteColor.style.border = '2px solid #E97E00';
    } else {
      movieVoteColor.style.border = '2px solid #E90000';
    }
  }

  dateRelease(date) {
    if (date !== undefined) {
      if (date !== '' && Number(date.split('', 4).join('')) >= 1970) {
        return format(new Date(date), 'MMMM dd, yyyy');
      }
    }
    return date;
  }

  moviePoster(poster) {
    if (poster !== null) {
      return `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`;
    } else {
      return 'http://dummyimage.com/220x330/5675ff/ffffff&text=Movie';
    }
  }

  textChange(idText, idTitle) {
    let container;
    if (document.getElementById(this.props.movie.id + 'container')) {
      container = document.getElementById(this.props.movie.id + 'container').clientHeight;
    }

    let text;
    if (document.getElementById(idText)) {
      if (text !== null) {
        text = document.getElementById(idText).clientHeight;
      }
    }

    let title;
    if (document.getElementById(idTitle)) {
      if (title !== null) {
        title = document.getElementById(idTitle).clientHeight;
      }
    }

    const resultHeight = Math.round((container - title) / 22) * 22;
    const resultRows = Math.round((container - title) / 22);
    this.setState({
      heigth: `var(--height, ${resultHeight}px)`,
      rows: `var(--row, ${resultRows})`,
    });
  }

  componentDidMount() {
    this.changeColor(this.props.movie.id);
  }

  render() {
    const { movie, onChangeRate } = this.props;
    /*
    let text;
    if (movie.overview.split(' ').length > 20) {
      text = movie.overview.split(' ', 20).join(' ').trim() + '...';
    } else text = movie.overview;*/

    let vote = String(movie.vote_average);
    if (vote.split('').length > 4) {
      vote = Number(vote).toFixed(2);
    }

    return (
      <Col span={12} key={movie.id}>
        <li className="movie" key={movie.id}>
          <div className="movie__view">
            <img
              className="movie__image"
              alt={`poster: ${movie.title}`}
              src={this.moviePoster(movie.poster_path)}
            ></img>
            <Card className="movie__inf">
              <div className="movie__space">
                <div className="movie__wrapper">
                  <div className="movie__inf-container" id={this.props.movie.id + 'container'}>
                    <div className="movie__inf-title" id={movie.id + 'title'}>
                      <span className="movie__title">{movie.title}</span>
                      <span className="movie__date-release">{this.dateRelease(movie.release_date)}</span>
                      <GetRequestConsumer>
                        {(genres) => {
                          return (
                            <MovieGenre
                              movie={movie}
                              genres={genres}
                              textChange={() =>
                                this.textChange(this.props.movie.id + 'text', this.props.movie.id + 'title')
                              }
                            />
                          );
                        }}
                      </GetRequestConsumer>
                    </div>
                    <p
                      className="movie__overview"
                      id={movie.id + 'text'}
                      style={{
                        WebkitLineClamp: this.state.rows,
                        height: this.state.heigth,
                      }}
                    >
                      {movie.overview}
                    </p>
                  </div>
                </div>
                <span className="movie__rate-container">
                  <Rate count={10} allowHalf style={{ fontSize: 16 }} onChange={(e) => onChangeRate(e, movie)} />
                </span>
              </div>
            </Card>
            <span id={movie.id} className="movie__vote-average">
              {vote}
            </span>
          </div>
        </li>
      </Col>
    );
  }
}

MoviesListItem.defaultProps = {
  movies: [],
  onChangeRate: () => {},
};

MoviesListItem.propsTypes = {
  movies: PropTypes.array,
  onChangeRate: PropTypes.func,
};
