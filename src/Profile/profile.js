import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchAuthMe, selectIsAuth } from '../redux/auth';
import axios from '../axios';

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector((state) => state.auth);

  const originalDataRef = useRef(data || {});

  const [user, setUser] = useState({
    imageUrl: data?.imageUrl || '',
    nickNam: data?.nickNam || '',
    email: data?.email || '',
  });
  
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const popupRef = useRef(null);
  const fileInputRef = useRef(null);
  const [changePhoto, setChangePhoto] = useState(true);
  const [save, setSave] = useState(true);

  const onSubmit = async () => {
    if (JSON.stringify(user) === JSON.stringify(originalDataRef.current)) {
      setEditing(false); 
      return;
    }
    try {
      await axios.patch('/profile', user);
      window.location.reload();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChange = async (e) => {
    const { type, name, value, files } = e.target;
    
    if (type === 'file' && files.length > 0) {   
      const file = files[0];
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const { data } = await axios.post('/uploads', formData);
        
        setUser((prevUser) => ({
          ...prevUser,
          imageUrl: data.url,
        }));
        setChangePhoto(false);
        setSave(false);
      } catch (err) {
        console.error('Error uploading photo:', err);
        alert('Помилка завантаження фотографії');
      }
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleClickOutsidePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsidePopup);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePopup);
    };
  }, []);

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />;
  }
  return (
    <div className={cn(styles.root)}>
      <div className={styles.flex_col}>
        <h2 className={styles.hero_title13}>My Profile</h2>

        <div
          className={styles.content_box2}
          onClick={handleContentBoxClick}
        >
          {data ? (
            <img src={changePhoto ? `http://localhost:5555${data.imageUrl}` : `http://localhost:5555${user.imageUrl}`} alt="Avatar" className={styles.avatar} />
          ) : (
            <h2 className={styles.hero_title}>Avatar</h2>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>

      <div className={styles.content_box6}>
      <div className={styles.content_box3}>
          <div className={styles.color1} />
          <input
            className={styles.medium_title}
            onChange={handleChange}
            name='nickNam'
            value={user.nickNam}
            placeholder="Nickname"
            disabled={!isEditing}
          />
          <h3 className={styles.medium_title1}>Nickname</h3>
        </div>
        <div className={styles.content_box4}>
          <div className={styles.color1} />
          <h3 className={styles.medium_title11}>Email</h3>
          <input
            onChange={handleChange}
            name='email'
            value={user.email}
            className={styles.medium_title2}
            placeholder="Email"
            disabled={!isEditing}
          />
        </div>
        <button
          className={styles.changeButton}
          onClick={() => setEditing(true)}
          style={{ display: isEditing ? 'none' : 'block' }}
        >
          Change
        </button>

        <button
          className={styles.saveButton}
          onClick={() => {
            setEditing(false);
            onSubmit();
          }}
          style={{ display: isEditing ? 'block' : 'none' }}
        >
          Save
        </button>
      </div>

      <div className={styles.content_box}>
        <div className={styles.flex_row4}>
          <Link to="/" className={styles.hero_title1}>
            <h2 className={styles.hero_title1}>UzhnuMusic</h2>
          </Link>
          <Link to="/" className={styles.hero_title6}>
            <h2 className={styles.title2}>Music</h2>
          </Link>
          <Link to="/genre" className={styles.hero_title9}>
            <h2 className={styles.title21}>Genre</h2>
          </Link>
          <Link to="/preferences" className={styles.bb3}>
            <h2 className={styles.bb3}>Preferences</h2>
          </Link>
          <div className={styles.btn} onClick={() => setPopupVisible(!isPopupVisible)}>
            <img className={styles.btn_icon} src={require('../icons/profile.png')} alt="Profile" />
            {isPopupVisible && (
              <div className={styles.popup} ref={popupRef}>
                <h3>{data && data.nickNam ? data.nickNam : ''}</h3>
                <p>{data && data.email ? data.email : ''}</p>
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
