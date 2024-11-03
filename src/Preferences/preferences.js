import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import styles from './preferences.module.scss';

function UntitledPage123545(props) {
  const navigate = useNavigate(); 
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
        <div className={styles.content_box4}>
          <div className={styles.color1} />
          <img className={styles.image1} src={'/icons/5a10a21e5273ec1f9cce7c08fcb31d57.png'} alt="alt text" />
          <h3 className={styles.medium_title1}>Mercy</h3>
          <h2 className={styles.title}>Shawn Mendes</h2>
          <img className={styles.image2} src={'/assets/6ae4a4dfbf438f0ed9572a589f1eaaaa.png'} alt="alt text" />
          <img className={styles.image21} src={'/assets/75b5d3a9afa629038827e957f2c336d1.png'} alt="alt text" />
          <div className={styles.color2} />
          <h3 className={styles.subtitle}>2:16</h3>
          <img className={styles.image22} src={'/assets/e76c54f7577ea059a2d9f84f7bb7978a.png'} alt="alt text" />
        </div>

        <div className={styles.content_box41}>
          <div className={styles.color1} />
          <img className={styles.image1} src={'/assets/913dce2f18efd3b98c4d191596fe7852.png'} alt="alt text" />
          <h3 className={styles.medium_title11}>Falling</h3>
          <h2 className={styles.title1}>Trevor Daniel</h2>
          <img className={styles.image2} src={'/assets/6ae4a4dfbf438f0ed9572a589f1eaaaa.png'} alt="alt text" />
          <img className={styles.image21} src={'/assets/75b5d3a9afa629038827e957f2c336d1.png'} alt="alt text" />
          <div className={styles.color2} />
          <h3 className={styles.subtitle}>2:16</h3>
          <img className={styles.image23} src={'/assets/e76c54f7577ea059a2d9f84f7bb7978a.png'} alt="alt text" />
        </div>

        <div className={styles.content_box42}>
          <div className={styles.color1} />
          <img className={styles.image1} src={'/assets/01d74da11f43e323d42e763d0d300a9a.png'} alt="alt text" />
          <h3 className={styles.medium_title12}>I need a Dollar</h3>
          <h2 className={styles.title2}>Aloe Blacc</h2>
          <img className={styles.image2} src={'/assets/6ae4a4dfbf438f0ed9572a589f1eaaaa.png'} alt="alt text" />
          <img className={styles.image21} src={'/assets/75b5d3a9afa629038827e957f2c336d1.png'} alt="alt text" />
          <div className={styles.color2} />
          <h3 className={styles.subtitle}>2:16</h3>
          <img className={styles.image23} src={'/assets/e76c54f7577ea059a2d9f84f7bb7978a.png'} alt="alt text" />
        </div>

        <div className={styles.content_box41}>
          <div className={styles.color1} />
          <img className={styles.image1} src={'/assets/183d0f744fb7322bb9cd8e57a9329a27.png'} alt="alt text" />
          <h3 className={styles.medium_title13}>older</h3>
          <h2 className={styles.title3}>Isabel LaRosa</h2>
          <img className={styles.image2} src={'/assets/6ae4a4dfbf438f0ed9572a589f1eaaaa.png'} alt="alt text" />
          <img className={styles.image21} src={'/assets/75b5d3a9afa629038827e957f2c336d1.png'} alt="alt text" />
          <div className={styles.color2} />
          <h3 className={styles.subtitle}>2:16</h3>
          <img className={styles.image23} src={'/assets/e76c54f7577ea059a2d9f84f7bb7978a.png'} alt="alt text" />
        </div>
      </div>
      <div className={styles.content_box}>
        <div className={styles.flex_row4}>
          
        <Link to="/mainwhith" className={styles.hero_title7} style={{ textDecoration: 'none' }}>
        <h2 className={styles.hero_title1}>UzhnuMusic</h2>
        </Link>
          <Link to="/mainwhith" className={styles.hero_title6}>
            <h2 className={styles.title10}>Music</h2>
          </Link>
          <Link to="/genrewhith" className={styles.hero_title9}>
            <h2 className={styles.title21}>Genre</h2>
          </Link>
          <h2 className={styles.bb3}>Preferences</h2>

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

UntitledPage123545.propTypes = {
  className: PropTypes.string
};

export default UntitledPage123545;
