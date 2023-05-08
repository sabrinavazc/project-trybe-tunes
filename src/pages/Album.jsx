import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    trackList: [],
  };

  componentDidMount() {
    this.renderTrackList();
  }

  renderTrackList = async () => {
    const { match: { params: { id } } } = this.props;
    const trackList = await getMusics(id);
    const { artistName, collectionName } = trackList[0];

    this.setState({
      artistName,
      collectionName,
      trackList,
    });
  };

  handleCheckBox = async ({ target }, trackId, trackName, previewUrl) => {
    const { checked } = target;
    const { getFavoriteSongs, setChecked, setLoading, addSong, removeSong } = this.props;

    setChecked(getFavoriteSongs().some(({ trackId: id }) => id === trackId));
    setLoading(true);

    const song = { trackId, trackName, previewUrl };
    if (checked) {
      await addSong(song);
      console.log(`Música ${trackName} adicionada aos favoritos!`);
    } else {
      await removeSong(trackId);
      console.log(`Música ${trackName} removida dos favoritos!`);
    }
    setLoading(false);
  };

  render() {
    const { artistName, collectionName, trackList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {
            trackList.map(({ trackId, trackName, previewUrl }, index) => (
              index === 0 ? (
                <div key={ index }>
                  <h2 data-testid="album-name">{ collectionName }</h2>
                  <h4 data-testid="artist-name">{ artistName }</h4>
                </div>
              ) : (
                <MusicCard
                  key={ trackId }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  handleCheckBox={ this.handleCheckBox }
                />
              )
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getFavoriteSongs: PropTypes.func.isRequired,
  setChecked: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  addSong: PropTypes.func.isRequired,
  removeSong: PropTypes.func.isRequired,
};

export default Album;
