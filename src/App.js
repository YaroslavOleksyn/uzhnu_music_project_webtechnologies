import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Slavik} from './MainPage/main.js'
import Registration from "./Registration/reg.js";
import SingIn from "./SingIn/singin.js";
import {Profile} from './Profile/profile.js'
import {Genre} from "./Genre/genre.js";
import Preferences from "./Preferences/preferences.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/auth.js";

function App() {
  const dispatch =useDispatch();
  React.useEffect(()=>{
    dispatch(fetchAuthMe)
  },[]);
 
  return (
     <div className="App">
       <Routes>
       <Route path="/" element={<Slavik/>}/>
       <Route path="/registration" element={<Registration />} />
       <Route path="/signin" element={<SingIn />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/genre" element={<Genre />} />
       <Route path="/preferences" element={<Preferences />} />
     </Routes>
   
     </div>
  );
}

export default App;
