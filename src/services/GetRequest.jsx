import React from 'react';

export default class GetRequest extends React.Component {
  _apiBase = 'https://api.themoviedb.org/3';
  _apiKey = '?api_key=6157d69c47f109097f7a9012be7c457f';

  async getResourseFetch(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  }

  async searchMoviesFetch(value, page) {
    const res = await this.getResourseFetch(`/search/movie${this._apiKey}&query=${value}&page=${page}`);
    return {
      results: res.results,
      total_pages: res.total_pages,
      total_results: res.total_results,
      page: res.page,
    };
  }

  async movieGenreFetch(id) {
    const res = await this.getResourseFetch(`/movie/${id}${this._apiKey}`);
    return res.genres;
  }
}
