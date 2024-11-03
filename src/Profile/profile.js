import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';

function UntitledPage123432(props) {
  const navigate = useNavigate(); 

  const [isNicknameEditable, setIsNicknameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const toggleNicknameEdit = () => setIsNicknameEditable((prev) => !prev);
  const toggleEmailEdit = () => setIsEmailEditable((prev) => !prev);
  const togglePasswordEdit = () => setIsPasswordEditable((prev) => !prev);

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn(styles.root, props.className, 'untitled-page123432')}>
      <div className={styles.flex_col}>
        <h2 className={styles.hero_title13}>My Profile</h2>

        <div className={styles.content_box2}>
          <h2 className={styles.hero_title}></h2>
        </div>

        <h2 className={styles.hero_title3}>YaroslavOleksyn</h2>
      </div>
      <div className={styles.content_box6}>
        <div className={styles.content_box3}>
          <div className={styles.color1} />
          <input 
            className={styles.medium_title} 
            placeholder='YaroslavOleksyn' 
            disabled={!isNicknameEditable}
          />
          <h3 className={styles.medium_title1} onClick={toggleNicknameEdit}>Change</h3>
        </div>
        <div className={styles.content_box4}>
          <div className={styles.color1} />
          <h3 className={styles.medium_title11}>Email</h3>
          <input 
            className={styles.medium_title2} 
            placeholder='oleksyn.yaroslav@gmail.com' 
            disabled={!isEmailEditable} 
          />
          <h3 className={styles.subtitle2} onClick={toggleEmailEdit}>Change</h3>
        </div>

        <div className={styles.content_box41}>
          <div className={styles.color11} />
          <h3 className={styles.medium_title12}>Password</h3>
          <input 
            className={styles.medium_title3} 
            placeholder='*********' 
            disabled={!isPasswordEditable} 
          />
          <h3 className={styles.subtitle3} onClick={togglePasswordEdit}>Change</h3>
        </div>
      </div>

      <div className={styles.content_box}>
        <div className={styles.flex_row4}>
          <h2 className={styles.hero_title1}>UzhnuMusic</h2>
          <Link to="/mainwhith" className={styles.hero_title6}>
            <h2 className={styles.title2}>Music</h2>
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

UntitledPage123432.propTypes = {
  className: PropTypes.string
};

export default UntitledPage123432;
