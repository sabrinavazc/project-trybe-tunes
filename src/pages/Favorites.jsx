import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
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

  render() {
    const { isLoading, favoritesList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {
          isLoading ? (
            <Loading />
          ) : (
            favoritesList.map((song) => (
              <div key={ song.trackId }>
                <MusicCard
                  song={ song }
                  key={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  handleFavoriteSongs={ this.handleFavoriteSongs }
                  isChecked={
                    favoritesList
                      .some((favoritesong) => song.trackId === favoritesong.trackId)
                  }
                />
              </div>
            ))
          )
        }
      </div>
    );
  }
}
export default Favorites;
