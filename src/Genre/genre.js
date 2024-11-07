import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLastFmTracks } from '../api/LastFm';
import { fetchJamendoTrack } from '../api/Jemendo'; 
import styles from './genre.module.scss';
import { GenreA } from '../components/genreA/genreA';
import { GenreUn } from '../components/genreUn/genreUn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from '../redux/auth';


export function Genre() {
  const dispatch =useDispatch();
  React.useEffect(()=>{
    dispatch(fetchAuthMe)
  },[]);
  const navigate = useNavigate();
  
  const isAuth=useSelector(selectIsAuth)
  const {data } =useSelector((state)=>state.auth)

  return isAuth?(<GenreA/>
  ):(<GenreUn/>) }