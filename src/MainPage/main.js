import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLastFmTracks } from '../api/LastFm'; 
import { fetchJamendoTrack } from '../api/Jemendo'; 
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, fetchAuthMe } from '../redux/auth';
import { MainA } from '../components/MainA/mainA';
import { MainUn } from '../components/MainUn/mainUn';

export function Slavik( ) {
  const dispatch =useDispatch();
  React.useEffect(()=>{
    dispatch(fetchAuthMe())
  },[]);
  const isAuth=useSelector(selectIsAuth);
  console.log(isAuth);
    return isAuth?(<MainA/>
    ):(<MainUn/>) }