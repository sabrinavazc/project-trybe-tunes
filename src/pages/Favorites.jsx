import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoritesList: [],
  };

  componentDidMount() {
    this.handleFavoriteSongs();
  }

  handleFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const favoritesList = await getFavoriteSongs();
    this.setState({ isLoading: false, favoritesList });
  };

  handleRemoveSong = async (trackId) => {
    this.setState({ isLoading: true });
    await removeSong(trackId);
    await this.handleFavoriteSongs();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, favoritesList } = this.state;
    let content = <p>Você não possui músicas favoritas ainda.</p>;
    if (isLoading) {
      content = <Loading />;
    } else if (favoritesList.length > 0) {
      content = favoritesList.map((song) => (
        <div key={ song.trackId }>
          <MusicCard
            song={ song }
            key={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            artworkUrl100={ song.artworkUrl100 } // adiciona a propriedade artworkUrl100
            isChecked={
              favoritesList.some((favoritesong) => song.trackId === favoritesong.trackId)
            }
            handleRemoveSong={ this.handleRemoveSong }
          />
        </div>
      ));
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { content }
      </div>
    );
  }
}

export default Favorites;
