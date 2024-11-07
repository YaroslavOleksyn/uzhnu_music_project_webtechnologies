import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLastFmTracks } from '../../api/LastFm'; 
import { fetchJamendoTrack } from '../../api/Jemendo'; 
import styles from './genre.module.scss';

export function GenreUn() {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Hip-Hop"); 
  const [tracks, setTracks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setDropdownVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return; 
    }

    try {
      const lastFmTracks = await fetchLastFmTracks(searchTerm); 
      const jamendoTracks = await Promise.all(
        lastFmTracks.map(track => fetchJamendoTrack(track.title, track.artist))
      );

      const combinedTracks = lastFmTracks.map((track, index) => ({
        title: track.title,
        artist: track.artist,
        coverImage: jamendoTracks[index].coverImage,
        url: jamendoTracks[index].url, 
      }));

      setTracks(combinedTracks); 
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      if (selectedGenre === "Popular") return; 

      try {
        const lastFmTracks = await fetchLastFmTracks(selectedGenre); 
        const jamendoTracks = await Promise.all(
          lastFmTracks.map(track => fetchJamendoTrack(track.title, track.artist))
        );

        const combinedTracks = lastFmTracks.map((track, index) => ({
          title: track.title,
          artist: track.artist,
          coverImage: jamendoTracks[index].coverImage,
          url: jamendoTracks[index].url, 
        }));

        setTracks(combinedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, [selectedGenre]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical", "Reggae"];

  return (
    <div className={cn(styles.root)}>
      <h2 className={styles.hero_title}>Top Music Genre</h2>

      <div className={styles.content_box8}>
          <h3 className={styles.medium_title21}>
            {searchTerm ? `${searchTerm} music` : `${selectedGenre} music`}
          </h3>
          <div className={styles.color10} />
          
          <div className={styles.flex_row1}>
            <h2 className={styles.title}>{selectedGenre} music</h2>
            <img 
              className={styles.image3} 
              src={require('../../icons/down.png')} 
              onClick={toggleDropdown} 
              alt="Dropdown"
            />
            {isDropdownVisible && (
              <div className={styles.dropdown} ref={dropdownRef}>
                {genres.map((genre) => (
                  <div 
                    key={genre} 
                    className={styles.dropdown_item} 
                    onClick={() => handleGenreSelect(genre)} 
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      <div className={styles.content_box7}>
        <div className={styles.flex_row2}>
          <input 
            className={styles.medium_title31} 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder='Search by genre' 
          />
          <img 
            className={styles.image} 
            src={require('../../icons/searchicon.png')} 
            alt="Search" 
            onClick={handleSearch} 
          />
        </div>
      </div>

      <div className={styles.trackList}>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div key={track.title} className={styles.trackContainer}>
              <div className={styles.trackInfo}>
                <img src={track.coverImage} alt="Cover" className={styles.coverImage} />
                <div className={styles.trackDetails}>
                  <h3 className={styles.trackTitle}>{track.title}</h3>
                  <h2 className={styles.artistName}>{track.artist}</h2>
                </div>
              </div>
              <audio controls className={styles.audioPlayer}>
                <source src={track.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>

              <img className={styles.downloadIcon} src={require('../../icons/likew.png')} alt="Download" />
            </div>
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </div>

      <div className={styles.content_box}>
        <div className={styles.flex_row4}>
          <h2 className={styles.hero_title1}>UzhnuMusic</h2>
          <Link to="/" className={styles.hero_title6}>
            <h2 className={styles.title2}>Music</h2>
          </Link>
          <h2 className={styles.title21}>Genre</h2>

          <button className={styles.btn} onClick={() => navigate('/registration')}>
            <img className={styles.btn_icon} src={require('../../icons/profile.png')} alt="Profile" />
            <h3 className={styles.btn_text}>Registration</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
