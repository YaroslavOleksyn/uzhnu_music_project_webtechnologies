import React, { useEffect, useState } from 'react';
import { fetchLastFmTrackById } from './api/LastFm'; 
import { fetchJamendoTrackById } from './api/Jamendo'; 

const MusicPlayer = ({ genre, trackIds }) => { 
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTracks = async () => {
      setLoading(true);
      setError(null); 

      try {
        const combinedTracks = await Promise.all(
          trackIds.map(async (trackId) => {

            const jamendoTrack = await fetchJamendoTrackById(trackId);
            
            if (jamendoTrack) {
              return {
                title: jamendoTrack.name,
                artist: jamendoTrack.artist_name,
                image: jamendoTrack.image,
                streamUrl: jamendoTrack.audio_url,
              };
            }

            const lastFmTrack = await fetchLastFmTrackById(trackId);
            if (lastFmTrack) {
              return {
                title: lastFmTrack.name,
                artist: lastFmTrack.artist.name,
                image: lastFmTrack.album ? lastFmTrack.album.image[2]['#text'] : '',
                streamUrl: lastFmTrack.url,
              };
            }

            return null; 
          })
        );

        const filteredTracks = combinedTracks.filter(track => track !== null);
        setTracks(filteredTracks);
      } catch (error) {
        console.error("Error fetching track:", error);
        setError("There was an error fetching the tracks.");
      } finally {
        setLoading(false);
      }
    };

    getTracks();
  }, [trackIds]);

  if (loading) {
    return <p>Loading tracks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {tracks.length > 0 ? (
        tracks.map(track => (
          <div key={track.title}>
            <h3>{track.title} - {track.artist}</h3>
            {track.image && <img src={track.image} alt={track.title} />}
            <audio controls>
              <source src={track.streamUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default MusicPlayer;
