/*
import React from 'react';

import GetRequest from '../../services/GetRequest';
import './MovieGenre.css';

export default class MovieGenre extends React.Component {
  getRequest = new GetRequest();
  state = {
    genres: [],
  };

  componentDidMount() {
    this.movieGenre();
  }

  componentDidUpdate(prevProps) {
    if (this.props.rated !== prevProps.rated) {
      this.movieGenre();
    }
  }

  async movieGenre() {
    const genres = await this.getRequest.movieGenreFetch(this.props.movie.id);
    this.setState({
      genres: genres,
    });
    if (this.props.textChangeRated) {
      this.props.textChangeRated(this.props.movie.id + 'text-rated', this.props.movie.id + 'title-rated');
    }
    if (this.props.textChange) {
      this.props.textChange(this.props.movie.id + 'text', this.props.movie.id + 'title');
    }
  }

  render() {
    const { genres } = this.state;
    const { movie } = this.props;

    if (genres.length !== 0) {
      return (
        <span className="movie__genre-container" id={movie.id + 'genre'}>
          {genres.map((genre) => {
            return (
              <div className="movie__genre" key={genre.id}>
                {genre.name}
              </div>
            );
          })}
        </span>
      );
    }
    return;
  }
}
*/
import React from 'react';

import './MovieGenre.css';

export default class MovieGenre extends React.Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    this.showGenresFunc();
  }

  async showGenresFunc() {
    await this.props.movie.genre_ids.map((genre_id) => {
      this.props.genres.map((genre) => {
        if (genre.id === genre_id) {
          this.setState(({ genres }) => {
            const arr = [...genres, genre.name];
            return {
              genres: arr,
            };
          });
        }
      });
    });
    if (this.props.textChangeRated) {
      this.props.textChangeRated(this.props.movie.id + 'text-rated', this.props.movie.id + 'title-rated');
    }
    if (this.props.textChange) {
      this.props.textChange(this.props.movie.id + 'text', this.props.movie.id + 'title');
    }
  }

  render() {
    const { movie } = this.props;
    const { genres } = this.state;

    return (
      <span className="movie__genre-container" id={movie.id + 'genre'}>
        {genres.map((genre) => {
          return (
            <div className="movie__genre" key={genre}>
              {genre}
            </div>
          );
        })}
      </span>
    );
  }
}
