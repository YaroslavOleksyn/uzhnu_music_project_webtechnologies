import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchRegister } from '../redux/auth.js';

import styles from './index2.module.scss';

function UntitledPage12(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isValid }, } = useForm({
    defaultValues: {
      nickNam: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    const reguser = await dispatch(fetchRegister(values));
    console.log('Registration response:', reguser);
    if (reguser.payload && reguser.payload.token) {
      window.localStorage.setItem('token', reguser.payload.token);
      navigate('/profile');
    } else {

      console.error('Registration failed or token not found:', reguser);
    }
  };
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  return (
    <div className={cn(styles.root, props.className, 'untitled-page12')}>
      <div className={styles.content_box1}>
        <div className={styles.color1} />
      </div>
      <div className={styles.flex_col}>
        <form className={styles.flex_col1} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.flex_col2}>
            <div className={styles.flex_col3}>
              <h2 className={styles.big_title}>Registration</h2>

              <div className={styles.content_box2}>
                <input
                  className={styles.medium_title1}
                  placeholder='Nicknam'
                  type='text'
                  {...register('nickNam', { required: 'Вкажіть нікнейм' })}
                />
                {errors.nickName && <span className={styles.error}>{errors.nickName.message}</span>}
              </div>

              <div className={styles.content_box21}>
                <input
                  className={styles.medium_title11}
                  placeholder='E-mail address'
                  type='email'
                  {...register('email', { required: 'Вкажіть пошту' })}
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              </div>
            </div>

            <div className={styles.content_box4}>
              <div className={styles.flex_row}>
                <input
                  className={styles.medium_title12}
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  {...register('password', { required: 'Вкажіть пароль' })}
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

            <div className={styles.content_box4}>
              <div className={styles.flex_row}>
                <input
                  className={styles.medium_title13}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm password'
                />
                <img
                  className={styles.image}
                  src={require('../icons/eyeicon.png')}
                  onClick={toggleConfirmPasswordVisibility}
                  alt="Show Confirm Password"
                />
              </div>
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <button className={styles.register_button} type='submit'>
            Register
          </button>
        </form>

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
