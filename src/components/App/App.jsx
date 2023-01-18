import React from 'react';

import { ItemList } from '../ItemList';

import './App.css';

class App extends React.Component {
  state = {
    movies: [],
  };

  async getMoviesFetch() {
    await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=6157d69c47f109097f7a9012be7c457f&language=en-US'
    ).then((result) => {
      if (result.ok) {
        result.json().then((res) => {
          this.setState({
            movies: res.results,
          });
        });
      } else {
        throw Error;
      }
    });
  }

  render() {
    this.getMoviesFetch();
    return (
      <div className="App">
        <ItemList movies={this.state.movies} />
      </div>
    );
  }
}
export default App;
