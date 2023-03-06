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

  async postResourseFetch(url, rate_vote) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ value: rate_vote }),
    });
  }

  async deleteResourseFetch(url) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error();
    }
    return;
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

  async movieAllGenresFetch() {
    const res = await this.getResourseFetch(`/genre/movie/list${this._apiKey}`);
    return res.genres;
  }

  async newGeustSession() {
    const res = await this.getResourseFetch(`/authentication/guest_session/new${this._apiKey}`);
    return res.guest_session_id;
  }

  async rateMoviePost(movie_id, guest_id, rate_vote) {
    if (rate_vote === 0) {
      return await this.rateMovieDelete(movie_id, guest_id);
    }
    return await this.postResourseFetch(
      `/movie/${movie_id}/rating${this._apiKey}&guest_session_id=${guest_id}`,
      rate_vote
    );
  }

  async rateMovieDelete(movie_id, guest_id) {
    return await this.deleteResourseFetch(`/movie/${movie_id}/rating${this._apiKey}&guest_session_id=${guest_id}`);
  }

  async getRatedMovies(guest_id, page) {
    const res = await this.getResourseFetch(`/guest_session/${guest_id}/rated/movies${this._apiKey}&page=${page}`);
    return {
      results: res.results,
      total_pages_rated: res.total_pages,
      total_results_rated: res.total_results,
      page_rated: res.page,
    };
  }
}
