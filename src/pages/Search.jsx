import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    artist: '',
  };

  handleChange = (event) => {
    this.setState({ artist: event.target.value });
  };

  render() {
    const { artist } = this.state;
    const numberDisabled = 2;
    const buttonDisabled = artist.length < numberDisabled;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          name=""
          value={ artist }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
