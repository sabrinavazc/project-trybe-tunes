import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

function MusicCard(props) {
  const { trackId, trackName, previewUrl, artworkUrl100 } = props;
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const handleFavoriteSong = useCallback(async () => {
    const favoritesSong = await getFavoriteSongs();
    setChecked(favoritesSong.some(({ trackId: id }) => id === trackId));
    setFavoriteSongs(favoritesSong);
  }, [trackId]);

  useEffect(() => {
    async function getFavoriteSongsAsync() {
      await handleFavoriteSong();
    }
    getFavoriteSongsAsync();
  }, [handleFavoriteSong]);

  async function handleCheckBox({ target }) {
    setLoading(true);
    setChecked(target.checked);
    if (target.checked) {
      await addSong({ trackId, trackName, previewUrl, artworkUrl100 });
      console.log(`Música ${trackName} adicionada aos favoritos!`);
    } else {
      await removeSong(trackId);
      console.log(`Música ${trackName} removida dos favoritos!`);
    }
    const favoritesSong = await getFavoriteSongs();
    setFavoriteSongs(favoritesSong);
    setLoading(false);
  }

  async function toggleFavorite() {
    setLoading(true);
    if (!favoriteSongs.some(({ trackId: id }) => id === trackId)) {
      await addSong({ trackId, trackName, previewUrl, artworkUrl100 });
      console.log(`Música ${trackName} adicionada aos favoritos!`);
    } else {
      await removeSong(trackId);
      console.log(`Música ${trackName} removida dos favoritos!`);
    }
    const favoritesSong = await getFavoriteSongs();
    setFavoriteSongs(favoritesSong);
    setLoading(false);
  }

  const checkBoxTestId = `checkbox-music-${trackId}`;

  return (
    <div>
      <p>{trackName}</p>
      <img src={ artworkUrl100 } alt={ trackName } />

      <audio
        data-testid="audio-component"
        src={ previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>

      <button onClick={ toggleFavorite }>
        {favoriteSongs.some(({ trackId: id }) => id === trackId)
          ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      </button>

      <label htmlFor={ checkBoxTestId }>
        Favorita
        {loading ? <Loading /> : (
          <input
            type="checkbox"
            id={ checkBoxTestId }
            data-testid={ checkBoxTestId }
            checked={ checked }
            onChange={ handleCheckBox }
          />
        )}
      </label>
    </div>
  );
}

MusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
