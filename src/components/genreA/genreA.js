import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import styles from './genrewhith.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchAuthMe } from '../../redux/auth';
import { fetchLastFmTracks } from '../../api/LastFm';
import { fetchJamendoTrack } from '../../api/Jemendo';

export function GenreA() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Popular");
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const lastFmTracks = await fetchLastFmTracks(selectedGenre);
        const jamendoTracks = await Promise.all(
          lastFmTracks.map((track) => fetchJamendoTrack(track.title, track.artist))
        );

        const combinedTracks = lastFmTracks.map((track, index) => ({
          title: track.title,
          artist: track.artist,
          ...jamendoTracks[index],
        }));

        setTracks(combinedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, [selectedGenre]);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setDropdownVisible(false);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSearch = async () => {
    try {
      const lastFmTracks = await fetchLastFmTracks(searchTerm || selectedGenre);
      const jamendoTracks = await Promise.all(
        lastFmTracks.map((track) => fetchJamendoTrack(track.title, track.artist))
      );

      const combinedTracks = lastFmTracks.map((track, index) => ({
        title: track.title,
        artist: track.artist,
        ...jamendoTracks[index],
      }));

      setTracks(combinedTracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const togglePopup = () => setPopupVisible((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical", "Reggae"];

  return (
    <div className={cn(styles.root)} data-testid="genre-component">
      <h2 className={styles.hero_title} data-testid="genre-header">Top Music Genre</h2>

      <div className={styles.content_box8} data-testid="genre-content-box">
        <h3 className={styles.medium_title21} data-testid="genre-title">
          {searchTerm ? 'Search Results' : `${selectedGenre} Music`}
        </h3>

        <div className={styles.flex_row1} data-testid="genre-dropdown-container">
          <h2 className={styles.title}>{selectedGenre} music</h2>
          <img
            className={styles.image3}
            src={require('../../icons/down.png')}
            onClick={toggleDropdown}
            alt="Dropdown"
            data-testid="dropdown-icon"
          />
          {isDropdownVisible && (
            <div className={styles.dropdown} ref={dropdownRef} data-testid="genre-dropdown">
              {genres.map((genre) => (
                <div
                  key={genre}
                  className={styles.dropdown_item}
                  onClick={() => handleGenreSelect(genre)}
                  data-testid={`genre-option-${genre}`}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.content_box7} data-testid="search-box">
        <div className={styles.flex_row2}>
          <input
            className={styles.medium_title31}
            placeholder="Search by artist, name etc."
            value={searchTerm}
            onChange={handleSearchChange}
            data-testid="search-input"
          />
          <img
            className={styles.image}
            src={require('../../icons/searchicon.png')}
            alt="Search"
            onClick={handleSearch}
            data-testid="search-icon"
          />
        </div>
      </div>

      <div className={styles.trackList} data-testid="track-list">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div key={track.title} className={styles.trackContainer} data-testid="track-item">
              <div className={styles.trackInfo}>
                <img src={track.coverImage} alt="Cover" className={styles.coverImage} data-testid="track-cover" />
                <div className={styles.trackDetails}>
                  <h3 className={styles.trackTitle} data-testid="track-title">{track.title}</h3>
                  <h2 className={styles.artistName} data-testid="track-artist">{track.artist}</h2>
                </div>
              </div>
              <audio controls className={styles.audioPlayer} data-testid="audio-player">
                <source src={track.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p data-testid="no-tracks">No tracks available</p>
        )}
      </div>

      <div className={styles.content_box} data-testid="navigation-container">
        <Link to="/" className={styles.hero_title7} style={{ textDecoration: 'none' }} data-testid="home-link">
          UzhnuMusic
        </Link>
        <Link to="/" className={styles.hero_title6} data-testid="music-link">
          Music
        </Link>
        <Link to="/genre" className={styles.hero_title9} data-testid="genre-link">
          Genre
        </Link>
        <Link to="/preferences" className={styles.hero_title10} data-testid="preferences-link">
          Preferences
        </Link>

        <div className={styles.btn} onClick={togglePopup} data-testid="profile-btn">
          <img className={styles.btn_icon} src={require('../../icons/profile.png')} alt="Profile" data-testid="profile-icon" />
          {isPopupVisible && (
            <div className={styles.popup} ref={popupRef} data-testid="profile-popup">
              <h3 data-testid="user-nickname">{data?.nickNam || ''}</h3>
              <p data-testid="user-email">{data?.email || ''}</p>
              <hr />
              <button
                onClick={() => navigate('/profile')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                data-testid="profile-account-button"
              >
                My account
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  dispatch(fetchAuth(null));
                  navigate('/');
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                data-testid="logout-button"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
