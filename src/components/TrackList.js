import React, { useEffect, useState } from 'react';
import { fetchLastFmTracks } from './api/LastFm';
import { fetchJamendoTrack } from './api/Jamendo';

const MusicPlayer = ({ genre }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTracks = async () => {
      setLoading(true);
      setError(null); // Скидаємо помилку на початку запиту

      try {
        const lastFmTracks = await fetchLastFmTracks(genre);

        const combinedTracks = await Promise.all(
          lastFmTracks.map(async (track) => {
            const jamendoTrack = await fetchJamendoTrack(track.title, track.artist);
            
            // Перевіряємо, чи Jamendo знайшов трек
            if (jamendoTrack && jamendoTrack.length > 0) {
              // Спробуємо знайти точний збіг за назвою та виконавцем
              let matchingTrack = jamendoTrack.find(t => 
                t.title.toLowerCase() === track.title.toLowerCase() &&
                t.artist.toLowerCase() === track.artist.toLowerCase()
              );

              // Якщо точного збігу не знайдено, шукаємо частковий збіг
              if (!matchingTrack) {
                matchingTrack = jamendoTrack.find(t => 
                  t.title.toLowerCase().includes(track.title.toLowerCase())
                );
              }

              // Якщо знайдено збіг, повертаємо дані треку
              if (matchingTrack && matchingTrack.audio) {
                return {
                  title: matchingTrack.title,
                  artist: matchingTrack.artist,
                  image: matchingTrack.image || track.image || '', // Використовуємо зображення з Jamendo, або, якщо його немає, - з Last.fm
                  streamUrl: matchingTrack.audio, // Отримуємо URL для стрімінгу
                };
              }
            }
            
            return null; // Повертаємо null, якщо Jamendo не знайшов трек
          })
        );

        const filteredTracks = combinedTracks.filter(track => track !== null);

        setTracks(filteredTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError("There was an error fetching the tracks.");
      } finally {
        setLoading(false); // Завантаження закінчено
      }
    };

    getTracks();
  }, [genre]);

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
