import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuth } from '../redux/auth.js';

import styles from './index.module.scss';

function UntitledPage123(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      nickNam: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    const reguser = await dispatch(fetchAuth(values));
    console.log('Registration response:', reguser); 
    if (reguser.payload && reguser.payload.token) {
      window.localStorage.setItem('token', reguser.payload.token);
      navigate('/profile');
    } else {

      console.error('Registration failed or token not found:', reguser);
      setError('email', { message: 'Registration failed, please try again.' }); 
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={cn(styles.root, props.className, 'untitled-page123')}>
      <div className={styles.content_box1}>
        <div className={styles.color1} />
      </div>
      <div className={styles.flex_col}>
        <h2 className={styles.big_title}>Sign in</h2>

        <form className={styles.flex_col1} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content_box2}>
            <input 
              className={styles.medium_title1} 
              placeholder='Email' 
              type='email' 
              {...register('email', { required: 'Вкажіть електронну пошту' })} 
             
            />
            {errors.nickNam && <span className={styles.error}>{errors.nickNam.message}</span>} 
          </div>

          <div className={styles.content_box21}>
            <input 
              className={styles.medium_title11} 
              placeholder='Nick Name' 
              {...register('nickNam', { required: 'Вкажіть нікнейм' })} 
  
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <div className={styles.content_box4}>
            <div className={styles.flex_row}>
              <input 
                className={styles.medium_title12} 
                placeholder='Password' 
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Вкажіть пароль ' })} 
              />
              <img 
                className={styles.image} 
                src={require('../icons/eyeicon.png')} 
                onClick={togglePasswordVisibility}
                alt="Show Password"
              />
            </div>
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
          </div>
          <button className={styles.register_button} type='submit' disabled={!isValid}> {}
            Register
          </button>
        </form>

        <h3 className={styles.medium_title_box}>
          <span className={styles.medium_title}>
            <span className={styles.medium_title_span0}>Don't have an account? </span>
            <Link to="/registration" className={styles.medium_title_span1}>Sign up</Link>
          </span>
        </h3>
      </div>
      
      <div className={styles.content_box}>
        <div className={styles.flex_row1}>
          <Link to="/" className={styles.hero_title}>
            <h2 className={styles.hero_title}>UzhnuMusic</h2>
          </Link>

          <button className={styles.btn} onClick={() => navigate('/registration')}>
            <img className={styles.btn_icon} src={require('../icons/profile.png')} alt="Profile" />
            <h3 className={styles.btn_text}>Registration</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

UntitledPage123.propTypes = {
  className: PropTypes.string,
};

export default UntitledPage123;
