import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Link, navigate, useNavigate } from 'react-router-dom';
import styles from './genrewhith.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchAuthMe, selectIsAuth } from '../../redux/auth';
import { fetchLastFmTracks } from '../../api/LastFm';
import { fetchJamendoTrack } from '../../api/Jemendo'; 


export function GenreA() {
  const dispatch =useDispatch();
  React.useEffect(()=>{
    dispatch(fetchAuthMe)
  },[]);
    const navigate = useNavigate(); 
    const {data } =useSelector((state)=>state.auth)
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("Popular"); 
    const [tracks, setTracks] = useState([]); 
    const dropdownRef = useRef(null);
    const popupRef = useRef(null); 
    const [searchTerm, setSearchTerm] = useState('');
    
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
      try {
        let lastFmTracks = [];
        if (searchTerm) {
          lastFmTracks = await fetchLastFmTracks(searchTerm);
        } else {
          lastFmTracks = await fetchLastFmTracks(selectedGenre);
        }
  
        const jamendoTracks = await Promise.all(
          lastFmTracks.map(track => fetchJamendoTrack(track.title, track.artist))
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

    useEffect(() => {
      const fetchTracks = async () => {
        try {
          const lastFmTracks = await fetchLastFmTracks(selectedGenre); 
          const jamendoTracks = await Promise.all(
            lastFmTracks.map(track => fetchJamendoTrack(track.title, track.artist))
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
    ;
    const genreOrSearchTitle = searchTerm ? 'Search Results' : selectedGenre === "Popular" ? "Popular Music" : `${selectedGenre} Music`;
  
    const togglePopup = () => {
      setPopupVisible((prev) => !prev);
    };
  
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
return(
    <div className={cn(styles.root)}>
      <h2 className={styles.hero_title}>Top Music Genre</h2>

      <div className={styles.content_box8}>
      <h3 className={styles.medium_title21}>{genreOrSearchTitle}</h3>
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
            placeholder='Search by artist, name etc.' 
            value={searchTerm} 
            onChange={handleSearchChange} 
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
          
        <Link to="/" className={styles.hero_title7} style={{ textDecoration: 'none' }}>
        <h2 className={styles.hero_title1}>UzhnuMusic</h2>
        </Link>
          <Link to="/" className={styles.hero_title6}>
            <h2 className={styles.title2}>Music</h2>
          </Link>
          <Link to="/genre" className={styles.hero_title9}>
            <h2 className={styles.title21}>Genre</h2>
          </Link>
          <Link to="/preferences" className={styles.hero_title10}>
            <h2 className={styles.bb3}>Preferences</h2>
          </Link>
          

          <div className={styles.btn} onClick={togglePopup}>
            <img className={styles.btn_icon} src={require('../../icons/profile.png')} alt="Profile" />
            {isPopupVisible && (
              <div className={styles.popup} ref={popupRef}>
                <h3>{data && data.nickNam?(data.nickNam):('')} </h3>
                <p>{data && data.email?(data.email):('')} </p>
                <hr />
                <button 
                  onClick={() => navigate('/profile')} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <p>My account</p>
                </button>
                <button 
                onClick={() => {
                  localStorage.removeItem('token'); 
                  dispatch(fetchAuth(null)); 
                  navigate('/'); 
                }} 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <p>Log out</p>
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}