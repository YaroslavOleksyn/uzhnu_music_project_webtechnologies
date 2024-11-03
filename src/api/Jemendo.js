import axios from 'axios';

const JAMENDO_API_URL = 'https://api.jamendo.com/v3.0/tracks';
const JAMENDO_CLIENT_ID = 'cbc3c42b';

export const fetchJamendoTrack = async (trackTitle, artistName) => {
  const response = await axios.get(JAMENDO_API_URL, {
    params: {
      client_id: JAMENDO_CLIENT_ID,
      search: `${trackTitle} ${artistName}`,
      format: 'json',
      limit: 1,
    },
  });

  if (response.data.results.length > 0) {
    const jamendoTrack = response.data.results[0];
    return {
      coverImage: jamendoTrack.image,
      url: jamendoTrack.audio, 
      duration: jamendoTrack.duration,
    };
  }
  return null; 
};
