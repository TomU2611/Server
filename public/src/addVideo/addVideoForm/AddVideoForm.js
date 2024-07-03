import React, { useState } from 'react';
import './AddVideoForm.css';

function AddVideoForm({ videoList, setVideos, users, connection}) {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

 
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !photo || !video) {
      alert('Please fill out all fields and upload both photo and video.');
      setTitle('');
      setPhoto(null);
      setVideo(null);
      document.querySelector('.add-video-form').reset();

      return;
    }

    const newVideo = {
      index: videoList.length,
      title: title,
      author: connection.user,
      authorDisplayName : users.find(user => user.username === connection.user).displayName,
      timeAgo: new Date().toLocaleString(),
      views: 0,
      photo: URL.createObjectURL(photo),
      path: URL.createObjectURL(video),
      likes: 0,
      dislikes: 0,
      commentsNum: 0,
      comments: []
    };
    // Add the new video to the list of videos in the AddVideo list
    setVideos([...videoList, newVideo]);

    // Clear the form fields
    setTitle('');
    setPhoto(null);
    setVideo(null);
    document.querySelector('.add-video-form').reset();

  };

  return (
    <form onSubmit={handleSubmit} className="add-video-form">
      <h2>Add Video</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Photo:
        <input type="file" onChange={handlePhotoChange} />
      </label>
      <label>
        Video:
        <input type="file" onChange={handleVideoChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddVideoForm;
