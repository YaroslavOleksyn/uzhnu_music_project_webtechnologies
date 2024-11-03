import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useNavigate, Link } from 'react-router-dom';
import styles from './index.module.scss';

function UntitledPage243(props) {

  const handleBoxClick = () => {
    navigate('/genrewhith');
  };
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Popular"); 
  const popupRef = useRef(null); 
  const dropdownRef = useRef(null);

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
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
  const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical", "Reggae"];

  return (
    <div className={cn(styles.root, props.className, 'untitled-page243')}>
      <h2 className={styles.hero_title}>Free music for your videos and listening</h2>
      <div className={styles.content_box6}>
        <div className={styles.flex_row}>
          <div className={styles.content_box1} onClick={handleBoxClick}>
            <div className={styles.color5} />
            <img className={styles.cover3} src={require('../images/cinematic.jpg')} alt="Cinematic" />
            <div className={styles.color6} />
            <h3 className={styles.medium_title}>Cinematic</h3>
            <div className={styles.color7} />
            <h3 className={styles.medium_title1}>Cinematic</h3>
          </div>
          <div className={styles.content_box2} onClick={handleBoxClick}>
            <img className={styles.cover} src={require('../images/epic.jpg')} alt="Epic" />
            <div className={styles.color1} />
            <h3 className={styles.medium_title2}>Epic</h3>
            <div className={styles.color8} />
            <h3 className={styles.medium_title11}>Epic</h3>
          </div>
          <div className={styles.content_box3} onClick={handleBoxClick}>
            <img className={styles.cover1} src={require('../images/modern.jpg')} alt="Modern" />
            <div className={styles.color2} />
            <h3 className={styles.medium_title3}>Modern</h3>
            <div className={styles.color8} />
            <h3 className={styles.medium_title12}>Modern</h3>
          </div>
          <div className={styles.content_box4} onClick={handleBoxClick}>
            <img className={styles.cover2} src={require('../images/party.jpg')} alt="Party" />
            <div className={styles.color3} />
            <h3 className={styles.medium_title4}>Party</h3>
            <div className={styles.color8} />
            <h3 className={styles.medium_title13}>Party</h3>
          </div>
          <div className={styles.content_box5} onClick={handleBoxClick}>
            <img className={styles.cover2} src={require('../images/chill.jpg')} alt="Chill" />
            <div className={styles.color4} />
            <h3 className={styles.medium_title5}>Chill</h3>
            <div className={styles.color8} />
            <h3 className={styles.medium_title14}>Chill</h3>
          </div>
        </div>
      </div>

      <div className={styles.content_box8}>
        <h3 className={styles.medium_title21}>{selectedGenre} music</h3>
        <div className={styles.color10} />
        <div className={styles.flex_row1}>
          <h2 className={styles.title}>{selectedGenre}</h2>
          <img 
            className={styles.image3} 
            src={require('../icons/down.png')} 
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
            placeholder='Search by artist, genre etc.' 
          />
          <img className={styles.image} src={require('../icons/searchicon.png')} alt="Search" />
        </div>
      </div>
      <div className={styles.content_box11}>
        <div className={styles.flex_row3}>
          <div className={styles.content_box9}>
            <h3 className={styles.medium_title41}>Mercy</h3>
            <h2 className={styles.title1}>Shawn Mendes</h2>
            <img className={styles.image2} src={require('../icons/play.png')} alt="Play" />
            <div className={styles.color12} />
            <h3 className={styles.subtitle}>2:16</h3>
          </div>
          <img className={styles.image21} src={require('../icons/likew.png')} alt="Like" />
        </div>
      </div>
      <img className={styles.image1} src={require('../images/mercy.jpg')} alt="Mercy" />
      <div className={styles.content_box111}>
        <div className={styles.flex_row3}>
          <div className={styles.content_box9}>
            <h3 className={styles.medium_title42}>Falling</h3>
            <h2 className={styles.title11}>Trevor Daniel</h2>
            <img className={styles.image2} src={require('../icons/play.png')} alt="Play" />
            <div className={styles.color12} />
            <h3 className={styles.subtitle}>2:16</h3>
          </div>
          <img className={styles.image21} src={require('../icons/likew.png')} alt="Like" />
        </div>
      </div>
      <img className={styles.image11} src={require('../images/falling.jpg')} alt="Falling" />
      <div className={styles.content_box}>
        <div className={styles.flex_row4}>
          <Link to="/mainwhith" className={styles.hero_title10}>
          <h2 className={styles.hero_title1}>UzhnuMusic</h2>
          </Link>
          <Link to="/mainwhith" className={styles.hero_title6}>
            <h2 className={styles.title2}>Music</h2>
          </Link>
          <Link to="/genrewhith" className={styles.hero_title9}>
            <h2 className={styles.title21}>Genre</h2>
          </Link>
          <Link to="/preferences" className={styles.hero_title11}>
          <h2 className={styles.bb3}>Preferences</h2>
          </Link>
          <div className={styles.btn} onClick={togglePopup}>
            <img className={styles.btn_icon} src={require('../icons/profile.png')} alt="Profile" />
            {isPopupVisible && (
              <div className={styles.popup} ref={popupRef}>
                <h3>YaroslavOleksyn</h3>
                <p>oleksyn.yaroslav@gmail.com</p>
                <hr />
                <button 
                  onClick={() => navigate('/profile')} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <p>My account</p>
                </button>
                <button 
                  onClick={() => navigate('/')} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <p>Sign out</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

UntitledPage243.propTypes = {
  className: PropTypes.string
};

export default UntitledPage243;
