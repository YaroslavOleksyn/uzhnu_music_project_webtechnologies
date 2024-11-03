import axios from 'axios';

// Last.fm API
const LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0/';
const LASTFM_API_KEY = 'c943ddf3a3054d13acedc1d9ccd4a786';

export const fetchLastFmTracks = async (genre) => {
  const response = await axios.get(LASTFM_API_URL, {
    params: {
      method: 'tag.getTopTracks',
      tag: genre,
      api_key: LASTFM_API_KEY,
      format: 'json',
      limit: 10,
    },
  });

  return response.data.tracks.track.map(track => ({
    title: track.name,
    artist: track.artist.name,
    image: track.image[2]['#text'], // Отримуємо зображення середнього розміру
    genre: genre,
  }));
};

