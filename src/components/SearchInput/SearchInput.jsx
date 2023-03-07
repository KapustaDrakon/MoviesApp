import React from 'react';
import PropTypes from 'prop-types';

import GetRequest from '../../services/GetRequest';

import './SearchInput.css';

export default class SearchInput extends React.Component {
  getRequest = new GetRequest();

  state = {
    searchValue: '',
  };

  debounce = (fn) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(context, args);
      }, 500);
    };
  };

  onValueChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
    if (this.state.searchValue === '') {
      this.props.searchMovies(this.state.searchValue);
    }
    if (this.state.searchValue.split(' ').length - 1 !== this.state.searchValue.length) {
      this.props.searchMovies(this.state.searchValue);
    }
  };

  render() {
    return (
      <input
        type="text"
        className="search-input"
        placeholder="Type to search..."
        autoFocus
        onChange={this.debounce(this.onValueChange.bind(this))}
      />
    );
  }
}

SearchInput.defaultProps = {
  searchMovies: () => {},
};

SearchInput.propTypes = {
  searchMovies: PropTypes.func,
};
