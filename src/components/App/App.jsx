import React from 'react';
import { Alert, Pagination, Tabs } from 'antd';

import { MoviesList } from '../MoviesList';
import { MoviesRated } from '../MoviesRated';
import { Network } from '../Network';
import { SearchInput } from '../SearchInput';
import { ErrorMessage } from '../ErrorMessage';
import { Spinner } from '../Spinner';
import GetRequest from '../../services/GetRequest';
import { GetRequestProvider } from '../../context/ContextService';

import './App.css';

class App extends React.Component {
  getRequest = new GetRequest();

  state = {
    movies: [],
    moviesRated: [],
    genres: [],
    seachValue: '',
    page: 1,
    total_pages: 1,
    total_results: 0,
    page_rated: 1,
    total_pages_rated: 1,
    total_results_rated: 0,
    spin: false,
    error: false,
    network: false,
  };

  onChangeRate = (event, movieRated) => {
    //console.log(event, movieRated.id, localStorage.getItem('guest_session_id'));
    (async () => {
      await this.getRequest.rateMoviePost(movieRated.id, localStorage.getItem('guest_session_id'), event);
      await this.showRatedMovies();
    })();
  };

  async showRatedMovies(page_rated = 1) {
    const guest_id = localStorage.getItem('guest_session_id');
    const results = await this.getRequest.getRatedMovies(guest_id, page_rated);
    return this.setState({
      moviesRated: results.results,
      total_pages_rated: results.total_pages_rated,
      total_results_rated: results.total_results_rated,
      page_rated: results.page_rated,
    });
  }

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
    //console.log(searchValue);
    if (results.results.length === 0 && searchValue !== '') {
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

  async getAllGenres() {
    const genres = await this.getRequest.movieAllGenresFetch();
    this.setState({
      genres: genres,
    });
  }

  componentDidMount() {
    this.searchMovies();
    this.getAllGenres();
    (async () => {
      if (!localStorage.getItem('guest_session_id')) {
        const id = await this.getRequest.newGeustSession();
        localStorage.setItem('guest_session_id', id);
      }
      await this.showRatedMovies();
      //console.log(localStorage.getItem('guest_session_id'), '- localStorage');
    })();
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
    const { movies, spin, error, network, moviesRated, genres } = this.state;

    //console.log(moviesRated);
    return (
      <div className="app">
        <GetRequestProvider value={genres}>
          <Tabs onTabClick={() => this.showRatedMovies()}>
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
              {moviesRated.length !== 0 ? (
                <div className="app__movie-list-and-pagination">
                  <MoviesRated moviesRated={moviesRated} onChangeRate={this.onChangeRate} />
                  <Pagination
                    current={this.state.page_rated}
                    total={this.state.total_results_rated}
                    showSizeChanger={false}
                    pageSize={20}
                    onChange={(page_rated) => {
                      this.setState({
                        page_rated: page_rated,
                      });
                      this.showRatedMovies(page_rated);
                    }}
                  />
                </div>
              ) : (
                <Spinner spin={spin} />
              )}
            </Tabs.TabPane>
          </Tabs>
        </GetRequestProvider>
      </div>
    );
  }
}

export default App;
