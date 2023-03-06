import React from 'react';
import { Col, Card, Rate } from 'antd';
import { format } from 'date-fns';

//import { MovieGenre } from '../MovieGenre';
import { GetRequestConsumer } from '../ContextService';
import './MoviesRatedItem.css';
import { MovieGenre } from '../MovieGenre';

export default class MoviesRatedItem extends React.Component {
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

  textChangeRated(idText, idTitle) {
    let container = document.getElementById(this.props.movie.id + 'container-rated');
    let text = document.getElementById(idText);
    let title = document.getElementById(idTitle);

    if (container !== null) {
      container = container.clientHeight;
    }

    if (text !== null) {
      text = text.clientHeight;
    }

    if (title !== null) {
      title = title.clientHeight;
    }

    const resultHeight = Math.round((container - title) / 22) * 22;
    const resultRows = Math.round((container - title) / 22);

    return {
      height: `var(--height, ${resultHeight}px)`,
      rows: `var(--row, ${resultRows})`,
    };
  }

  componentDidMount() {
    this.changeColor(this.props.movie.id + '-rated');
    this.textChangeRated(this.props.movie.id + 'text-rated', this.props.movie.id + 'title-rated');
  }

  componentDidUpdate() {
    this.textChangeRated(this.props.movie.id + 'text-rated', this.props.movie.id + 'title-rated');
  }

  render() {
    const { movie, onChangeRate /*, rated*/ } = this.props;

    // let text;
    // if (movie.overview.split(' ').length > 20) {
    //   text = movie.overview.split(' ', 20).join(' ').trim() + '...';
    // } else text = movie.overview;

    let vote = String(movie.vote_average);
    if (vote.split('').length > 4) {
      vote = Number(vote).toFixed(2);
    }

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
                      <GetRequestConsumer>
                        {(genres) => {
                          return (
                            <MovieGenre
                              movie={movie}
                              genres={genres}
                              textChangeRated={() =>
                                this.textChangeRated(
                                  this.props.movie.id + 'text-rated',
                                  this.props.movie.id + 'title-rated'
                                )
                              }
                            />
                          );
                        }}
                      </GetRequestConsumer>
                    </div>
                    <p
                      className="movie-rated__overview"
                      id={movie.id + 'text-rated'}
                      style={{
                        WebkitLineClamp: this.textChangeRated(
                          this.props.movie.id + 'text-rated',
                          this.props.movie.id + 'title-rated'
                        ).rows,
                        height: this.textChangeRated(
                          this.props.movie.id + 'text-rated',
                          this.props.movie.id + 'title-rated'
                        ).height,
                      }}
                    >
                      {movie.overview}
                    </p>
                  </div>
                </div>
                <span className="movie-rated__rate-container">
                  <Rate
                    count={10}
                    allowHalf
                    style={{ fontSize: 16 }}
                    defaultValue={movie.rating}
                    onChange={(e) => onChangeRate(e, movie)}
                  />
                </span>
              </div>
            </Card>
            <span id={movie.id + '-rated'} className="movie-rated__vote-average">
              {vote}
            </span>
          </div>
        </li>
      </Col>
    );
  }
}
