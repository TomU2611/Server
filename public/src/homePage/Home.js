import React from 'react';
import TopBar from '../topBar/TopBar'; 
import Dropdown from '../topBar/Dropdown';
import '../homePage/Home.css';
import SideBar from '../sideBar/SideBar';
import VideoList from '../videoList/Videolist';
import WatchVideoScreen from '../VideoScreen/WatchVideoScreen';
import { Routes, Route } from 'react-router-dom';
import AddVideo from '../addVideo/AddVideo';

import { useState } from 'react';




function Home({theme,setTheme, connection, setConnection , users, darkMode, videoList, setVideos, searchQuery, setSearchQuery}) {
  


  return (
    <div  className={`Home ${darkMode ? 'dark-mode' : ''}`}>
      <TopBar theme={theme} setTheme={setTheme} connection={connection} setConnection={setConnection} users={users} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={
          <div>
            <VideoList videoList={videoList} searchQuery={searchQuery} users={users}/>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-3">
                  <SideBar />
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/watch/:videoID" element={
          <div className='videoScreen'>
            <WatchVideoScreen className='watchVideo' users={users} connection={connection} videoList={videoList} setVideos={setVideos} searchQuery={searchQuery}/>
            
          </div>
        } />
        <Route path="/add" element={<AddVideo connection={connection} users={users} videoList={videoList} setVideos={setVideos} />} />
        
      </Routes>


    </div>
  );
}


export default Home;
