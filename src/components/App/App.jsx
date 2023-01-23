import React from 'react';

import { MoviesList } from '../MoviesList';
import { Network } from '../Network';

import './App.css';

class App extends React.Component {
  state = {
    movies: [],
    spin: true,
    error: false,
    network: false,
  };

  constructor() {
    super();
    this.getMoviesFetch();
  }

  async getMoviesFetch() {
    return await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=6157d69c47f109097f7a9012be7c457f&language=en-US&query=return&page=1&include_adult=false'
    )
      .then((result) => {
        if (result.ok) {
          result.json().then((res) => {
            this.setState({
              movies: res.results,
              spin: false,
            });
          });
        }
      })
      .catch(this.onError);
  }

  onError() {
    this.setState({
      error: true,
      spin: false,
    });
  }

  onNetworkState = () => {
    this.setState((prevState) => ({
      network: !prevState.network,
    }));
  };

  render() {
    const { movies, spin, error, network } = this.state;

    return (
      <div className="App">
        <Network onNetworkState={this.onNetworkState} />
        <MoviesList movies={movies} spin={spin} error={error} network={network} />
      </div>
    );
  }
}

export default App;
