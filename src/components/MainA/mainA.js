import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLastFmTracks } from '../../api/LastFm'; 
import { fetchJamendoTrack } from '../../api/Jemendo'; 
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth';
import { fetchAuth, fetchAuthMe } from '../../redux/auth';

export function MainA(props) {
  const dispatch =useDispatch();
  React.useEffect(()=>{
    dispatch(fetchAuthMe)
  },[]);
  const isAuth=useSelector(selectIsAuth)
  const {data } =useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Popular");
  const [tracks, setTracks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const dropdownRef = useRef(null);
  const genres = ["Eminem", "Billie eilish", "50 Cent", "Travis Scott", "XXXTentacion", "The Weeknd", "Aurora"];
  const popupRef = useRef(null); 
  const [isPopupVisible, setPopupVisible] = useState(false);
  const onClickLogout =()=>{
    localStorage.removeItem('token');
    return (<Link to="/" refresh="true"/>
  )}
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
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

  const handleBoxClick2 = () => {
    navigate('/genre');
  };
  
  const handleBoxClick = () => {
    
    console.log("Box clicked");
  };
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setDropdownVisible(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
    return (
    <div className={cn(styles.root, props.className, 'untitled-page243')}>
        <h2 className={styles.hero_title}>Free music for your videos and listening</h2>
        <div className={styles.content_box6}>
          <div className={styles.flex_row}>
            <div className={styles.content_box1} onClick={handleBoxClick2}>
              <div className={styles.color5} />
              <img className={styles.cover3} src={require('../../images/cinematic.jpg')} alt="Cinematic" />
              <div className={styles.color6} />
              <h3 className={styles.medium_title}>Cinematic</h3>
              <div className={styles.color7} />
              <h3 className={styles.medium_title1}>Cinematic</h3>
            </div>
            <div className={styles.content_box2} onClick={handleBoxClick2}>
              <img className={styles.cover} src={require('../../images/epic.jpg')} alt="Epic" />
              <div className={styles.color1} />
              <h3 className={styles.medium_title2}>Epic</h3>
              <div className={styles.color8} />
              <h3 className={styles.medium_title11}>Epic</h3>
            </div>
            <div className={styles.content_box3} onClick={handleBoxClick2}>
              <img className={styles.cover1} src={require('../../images/modern.jpg')} alt="Modern" />
              <div className={styles.color2} />
              <h3 className={styles.medium_title3}>Modern</h3>
              <div className={styles.color8} />
              <h3 className={styles.medium_title12}>Modern</h3>
            </div>
            <div className={styles.content_box4} onClick={handleBoxClick2}>
              <img className={styles.cover2} src={require('../../images/party.jpg')} alt="Party" />
              <div className={styles.color3} />
              <h3 className={styles.medium_title4}>Party</h3>
              <div className={styles.color8} />
              <h3 className={styles.medium_title13}>Party</h3>
            </div>
            <div className={styles.content_box5} onClick={handleBoxClick2}>
              <img className={styles.cover2} src={require('../../images/chill.jpg')} alt="Chill" />
              <div className={styles.color4} />
              <h3 className={styles.medium_title5}>Chill</h3>
              <div className={styles.color8} />
              <h3 className={styles.medium_title14}>Chill</h3>
            </div>
          </div>
        </div>
  
        <div className={styles.content_box8}>
        <h3 className={styles.medium_title21}>{genreOrSearchTitle}</h3>
          <div className={styles.color10} />
          <div className={styles.flex_row1}>
            <h2 className={styles.title}>{selectedGenre}</h2>
            <img 
              className={styles.image3} 
              src={require('../../icons/down.png')} 
              alt="Dropdown" 
              onClick={toggleDropdown} 
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
            <Link to="/" className={styles.hero_title10}>
            <h2 className={styles.hero_title1}>UzhnuMusic</h2>
            </Link>
            <Link to="/" className={styles.hero_title6}>
              <h2 className={styles.title2}>Music</h2>
            </Link>
            <Link to="/genre" className={styles.hero_title9}>
              <h2 className={styles.title21}>Genre</h2>
            </Link>
            <Link to="/preferences" className={styles.hero_title11}>
            <h2 className={styles.bb3}>Preferences</h2>
            </Link>
            <div className={styles.btn} onClick={togglePopup}>
              <img className={styles.btn_icon} src={require('../../icons/profile.png')} alt="Profile" />
              {isPopupVisible && (
                <div className={styles.popup} ref={popupRef}>
                  <h3>{data.nickNam}</h3>
                  <p>{data.email}m</p>
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
    )

}