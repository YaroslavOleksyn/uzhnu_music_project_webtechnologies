import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './preferences.module.scss';

function UntitledPage123545(props) {
  const navigate = useNavigate(); 
  const {data } =useSelector((state)=>state.auth)
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Popular"); 
  const dropdownRef = useRef(null);
  const popupRef = useRef(null); 
  
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setDropdownVisible(false);
  };

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

  return (
    <div className={cn(styles.root, props.className, 'untitled-page123545')}>
       <h2 className={styles.hero_title}>Songs that you liked</h2>
      <div className={styles.content_box2}>
        <div className={styles.flex_row}>
        <input className={styles.medium_title} placeholder='Songs that you liked' />
          <img className={styles.image} src={require('../icons/searchicon.png')} />
        </div>
      </div>
      <div className={styles.flex_col}>
        <h2 className={styles.hero_title111}>Preferences list is Empty</h2>
      </div>
      <div className={styles.content_box}>
        <div className={styles.flex_row4}>
          
        <Link to="/" className={styles.hero_title7} style={{ textDecoration: 'none' }}>
        <h2 className={styles.hero_title1}>UzhnuMusic</h2>
        </Link>
          <Link to="/" className={styles.hero_title6}>
            <h2 className={styles.title10}>Music</h2>
          </Link>
          <Link to="/genre" className={styles.hero_title9}>
            <h2 className={styles.title21}>Genre</h2>
          </Link>
          <h2 className={styles.bb3}>Preferences</h2>

          <div className={styles.btn} onClick={togglePopup}>
            <img className={styles.btn_icon} src={require('../icons/profile.png')} alt="Profile" />
            {isPopupVisible && (
              <div className={styles.popup} ref={popupRef}>
                <h3>{data && data.nickNam?(data.nickNam):('')}</h3>
                <p>{data && data.email?(data.email):('')}</p>
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

UntitledPage123545.propTypes = {
  className: PropTypes.string
};

export default UntitledPage123545;
