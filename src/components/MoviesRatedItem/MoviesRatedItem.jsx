import React from 'react';
import { Col, Card, Rate } from 'antd';
import { format } from 'date-fns';

import { MovieGenre } from '../MovieGenre';
import './MoviesRatedItem.css';

export default class MoviesRatedItem extends React.Component {
  state = {
    heigth: '',
    rows: 0,
  };

  changeColor(id) {
    const movieVoteColor = document.getElementById(id);
    if (movieVoteColor.textContent >= 7) {
      movieVoteColor.style.border = '2px solid #00e900';
    } else if (movieVoteColor.textContent <= 4.9 && movieVoteColor.textContent != 0) {
      movieVoteColor.style.border = '2px solid #e90000';
    } else if (movieVoteColor.textContent == 0) {
      movieVoteColor.style.border = '2px solid #bbbaba';
    } else {
      movieVoteColor.style.border = '2px solid #e9d100';
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

  textChangeRated(idText, idTitle) {
    let container = document.getElementById(this.props.movie.id + 'container-rated');
    container = container.clientHeight;
    let text = document.getElementById(idText);
    if (text !== null) {
      text = text.clientHeight;
    }
    let title = document.getElementById(idTitle);
    if (title !== null) {
      title = title.clientHeight;
    }
    const resultHeight = Math.round((container - title) / 22) * 22;
    const resultRows = Math.round((container - title) / 22);
    this.setState({
      heigth: `var(--height, ${resultHeight}px)`,
      rows: `var(--row, ${resultRows})`,
    });
  }

  componentDidMount() {
    this.changeColor(this.props.movie.id + '-rated');
  }

  render() {
    const { movie, onChangeRate, rated } = this.props;

    // let text;
    // if (movie.overview.split(' ').length > 20) {
    //   text = movie.overview.split(' ', 20).join(' ').trim() + '...';
    // } else text = movie.overview;

    return (
      <Col span={12} key={movie.id + '-rated'}>
        <li className="movie-rated" key={movie.id + '-rated'}>
          <div className="movie-rated__view">
            <img className="movie-rated__image" alt="poster" src={this.moviePoster(movie.poster_path)}></img>
            <Card className="movie-rated__inf">
              <div className="movie-rated__space">
                <div className="movie__wrapper">
                  <div className="movie-rated__inf-container" id={movie.id + 'container-rated'}>
                    <div className="movie-rated__inf-title" id={movie.id + 'title-rated'}>
                      <span className="movie-rated__title">{movie.title}</span>
                      <span className="movie-rated__date-release">{this.dateRelease(movie.release_date)}</span>
                      <MovieGenre
                        movie={movie}
                        rated={rated}
                        textChangeRated={() =>
                          this.textChangeRated(this.props.movie.id + 'text-rated', this.props.movie.id + 'title-rated')
                        }
                      />
                    </div>
                    <p
                      className="movie-rated__overview"
                      id={movie.id + 'text-rated'}
                      style={{
                        WebkitLineClamp: this.state.rows,
                        height: this.state.heigth,
                      }}
                    >
                      {movie.overview}
                    </p>
                  </div>
                </div>
                <span className="movie-rated__rate-container" onClick={() => onChangeRate(movie)}>
                  <Rate count={10} allowHalf style={{ fontSize: 16 }} />
                </span>
              </div>
            </Card>
            <span id={movie.id + '-rated'} className="movie-rated__vote-average">
              {movie.vote_average}
            </span>
          </div>
        </li>
      </Col>
    );
  }
}
