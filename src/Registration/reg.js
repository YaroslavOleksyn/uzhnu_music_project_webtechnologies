import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import styles from './index2.module.scss';

function UntitledPage12(props) {
  const navigate = useNavigate(); 

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const handleRegister = () => {
    const newErrors = {};

    if (!nickname) newErrors.nickname = 'Please enter a nickname';
    if (!email) newErrors.email = 'Please enter an email address';
    if (!password) newErrors.password = 'Please enter a password';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate('/mainwhith');
    }
  };

  return (
    <div className={cn(styles.root, props.className, 'untitled-page12')}>
      <div className={styles.content_box1}>
        <div className={styles.color1} />
      </div>
      <div className={styles.flex_col}>
        <div className={styles.flex_col1}>
          <div className={styles.flex_col2}>
            <div className={styles.flex_col3}>
              <h2 className={styles.big_title}>Registration</h2>

              <div className={styles.content_box2}>
                <input 
                  className={styles.medium_title1} 
                  placeholder='Nickname' 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
              </div>

              <div className={styles.content_box21}>
                <input 
                  className={styles.medium_title11} 
                  placeholder='E-mail address' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
            </div>

            <div className={styles.content_box4}>
              <div className={styles.flex_row}>
                <input 
                  className={styles.medium_title12} 
                  type={showPassword ? "text" : "password"} 
                  placeholder='Password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img 
                  className={styles.image} 
                  src={require('../icons/eyeicon.png')} 
                  onClick={togglePasswordVisibility} 
                  alt="Show Password"
                />
              </div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.content_box4}>
              <div className={styles.flex_row}>
                <input 
                  className={styles.medium_title13}  
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder='Confirm password' 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img 
                  className={styles.image} 
                  src={require('../icons/eyeicon.png')} 
                  onClick={toggleConfirmPasswordVisibility} 
                  alt="Show Confirm Password"
                />
              </div>
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>
          </div>
        </div>
        <button className={styles.register_button} onClick={handleRegister}>
          Register
        </button>

        <h3 className={styles.medium_title_box}>
          <span className={styles.medium_title}>
            <span className={styles.medium_title_span0}>Already have an account? </span>
            <Link to="/signin" className={styles.medium_title_span1}>Sign in</Link>
          </span>
        </h3>
      </div>
      
      <div className={styles.content_box}>
        <div className={styles.flex_row1}>
          <Link to="/" className={styles.hero_title}>
            <h2 className={styles.hero_title}>UzhnuMusic</h2>
          </Link>

          <button className={styles.btn}>
            <img className={styles.btn_icon} src={require('../icons/profile.png')} />
            <h3 className={styles.btn_text}>Registration</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

UntitledPage12.propTypes = {
  className: PropTypes.string
};

export default UntitledPage12;
