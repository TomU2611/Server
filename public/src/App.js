import React, { useState, createContext } from 'react';
import Home from './homePage/Home'; 
import './App.css';

import { BrowserRouter, Route,Routes, link } from 'react-router-dom';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';
import videos from './data/defaultVideos.json';
import usersFile from './data/users';
export const ThemeContext = createContext(null);
function App() {
  const [videoList, setVideos] = useState(videos);
  const [users, setUsers] = useState(usersFile);
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const [connection, setConnection] = useState({ isConnected: false, user: '' });
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  

  return (
    <div id={theme} className='app-div'>
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        
        <Routes >
          <Route path="/login" element={<LoginPage  users={users} setConnection={setConnection}/>} />
          <Route path="/register" element={<RegisterPage users={users} setUsers={setUsers} setConnection={setConnection} />} />
          <Route path="/*" element={<Home theme={theme} setTheme={setTheme}  connection={connection} setConnection={setConnection} users={users} videoList={videoList} setVideos={setVideos} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}/>
        </Routes>
        
      </ThemeContext.Provider>
    </BrowserRouter>
    </div>
  )
}
/*
function App() {
  
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <WatchVideo darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
*/

export default App;
