import './AddVideo.css';
import React, { useState } from 'react';
import AddedVideoList from './addedVideoList/AddedVideoList';
import AddVideoForm from './addVideoForm/AddVideoForm';

function AddVideo( {connection, users, videoList, setVideos}) {
 

  return (
    <div className="add-video-container">
      <div className="add-video-form-container">
        <AddVideoForm videoList={videoList} setVideos={setVideos} users={users} connection={connection} />
      </div>
      <div className="added-video-list-container">
        <AddedVideoList videoList={videoList} setVideos={setVideos} users={users} connection={connection} />
      </div>
    </div>
  );
}

export default AddVideo;
