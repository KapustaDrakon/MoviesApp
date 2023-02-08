import React from 'react';
import { Alert, Pagination, Tabs } from 'antd';

import { MoviesList } from '../MoviesList';
import { MoviesRated } from '../MoviesRated';
import { Network } from '../Network';
import { SearchInput } from '../SearchInput';
import { ErrorMessage } from '../ErrorMessage';
import { Spinner } from '../Spinner';
import GetRequest from '../../services/GetRequest';

import './App.css';

class App extends React.Component {
  getRequest = new GetRequest();

  state = {
    movies: [],
    moviesRated: [],
    seachValue: '',
    page: 1,
    total_pages: 1,
    total_results: 0,
    rated: false,
    spin: false,
    error: false,
    network: false,
  };

  onChangeRate = (movieRated) => {
    const idx = movieRated.id;
    let check = false;
    this.setState(({ moviesRated }) => {
      if (moviesRated.length === 0) {
        return {
          moviesRated: [movieRated, ...moviesRated],
        };
      }
      moviesRated.map((movie) => {
        if (movie.id === idx) {
          return (check = true);
        }
      });

      if (!check) {
        return {
          moviesRated: [movieRated, ...moviesRated],
        };
      }
      check = false;
    });
  };

  searchMovies = (searchValue, page = 1) => {
    if (searchValue === '') {
      return this.setState({
        movies: [],
      });
    }
    if (searchValue === undefined) {
      return;
    }
    this.searchMovies2(searchValue, page);
  };

  async searchMovies2(searchValue, page) {
    this.setState({
      movies: [],
      spin: true,
      searchValue: searchValue,
      error: false,
    });
    const results = await this.getRequest.searchMoviesFetch(searchValue, page);
    if (results.results.length === 0) {
      return this.onError();
    } else {
      return this.setState({
        movies: results.results,
        total_pages: results.total_pages,
        total_results: results.total_results,
        page: results.page,
        spin: false,
        error: false,
      });
    }
  }

  componentDidMount() {
    this.searchMovies();
  }

  onError() {
    this.setState({
      error: true,
      spin: false,
    });
  }

  onRated = () => {
    this.setState((prevState) => ({
      rated: !prevState.rated,
    }));
  };

  onNetworkState = () => {
    this.setState((prevState) => ({
      network: !prevState.network,
    }));
  };

  render() {
    const { movies, spin, error, network, moviesRated, rated } = this.state;

    return (
      <div className="app">
        <Tabs onChange={this.onRated}>
          <Tabs.TabPane tab="Search" key="search">
            <SearchInput searchMovies={this.searchMovies} />
            <Network onNetworkState={this.onNetworkState} />
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
            {movies.length !== 0 ? (
              <div className="app__movie-list-and-pagination">
                <MoviesList movies={movies} onChangeRate={this.onChangeRate} />
                <Pagination
                  current={this.state.page}
                  total={this.state.total_results}
                  showSizeChanger={false}
                  pageSize={20}
                  onChange={(page) => {
                    this.setState({
                      page: page,
                    });
                    this.searchMovies(this.state.searchValue, page);
                  }}
                />
              </div>
            ) : (
              <Spinner spin={spin} />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rated" key="rated">
            <MoviesRated moviesRated={moviesRated} onChangeRate={this.onChangeRate} rated={rated} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
