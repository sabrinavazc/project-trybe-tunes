import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    search: '',
    collections: [],
    loading: '',
    searchedArtistName: '',
    hasSearched: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSearch = async () => {
    const { search } = this.state;
    const result = await searchAlbumsAPI(search);
    this.setState({
      searchedArtistName: search,
      collections: result,
      search: '',
      hasSearched: true,
    });
  };

  render() {
    const { search, collections, loading, searchedArtistName, hasSearched } = this.state;
    const numberBtnDisabled = 2;
    const buttonDisabled = search.length < numberBtnDisabled;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="search"
          name="search"
          placeholder="Nome do Artista"
          id=""
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleSearch }
        >
          Pesquisar
        </button>
        <div>
          {loading && <Loading />}
          {collections.length > 0 ? (
            <>
              <h2>{`Resultado de álbuns de: ${searchedArtistName} `}</h2>
              {collections.map((collection) => (
                <AlbumCard key={ collection.collectionId } { ...collection } />
              ))}
            </>
          ) : hasSearched && <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
