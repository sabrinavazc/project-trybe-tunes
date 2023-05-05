import React from 'react';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  state = {
    artist: '',
    collections: [],
    loading: false,
    searchedArtistName: '',
  };

  handleChange = (event) => {
    this.setState({ artist: event.target.value });
  };

  handleSearch = async () => {
    const { artist } = this.state;
    this.setState({ loading: true });

    try {
      const collections = await searchAlbumsAPI(artist);
      this.setState({
        collections,
        loading: false,
        searchedArtistName: artist,
      });
    } catch (error) {
      console.error('Erro na busca dos álbuns:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { artist, collections, searchedArtistName, loading } = this.state;
    const numberDisabled = 2;
    const buttonDisabled = artist.length < numberDisabled;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <>
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
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </>
        )}

        {collections.length > 0 ? (
          <>
            <h2
              data-testid="search-results"
            >
              {`Resultado de álbuns de: ${searchedArtistName}`}
            </h2>
            <div>
              {collections.map((album) => (
                <a key={ album.collectionId } href={ `/album/${album.collectionId}` }>
                  <AlbumCard
                    artistName={ album.artistName }
                    artworkUrl100={ album.artworkUrl100 }
                    collectionId={ album.collectionId }
                    collectionName={ album.collectionName }
                  />
                </a>
              ))}
            </div>
          </>
        ) : (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}
