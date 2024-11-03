import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./MainPage/main.js";
import Registration from "./Registration/reg.js";
import SingIn from "./SingIn/singin.js";
import MainPageWhithReg from "./MainPageWhithReg/genre.js";
import Profile from "./Profile/profile.js";
import Genre from "./Genre/genre.js";
import GenreWhith from "./GenreWhith/genrewhith.js";
import Preferences from "./Preferences/preferences.js";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/mainwhith" element={<MainPageWhithReg />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/genrewhith" element={<GenreWhith />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
