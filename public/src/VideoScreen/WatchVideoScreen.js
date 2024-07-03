import React, { useState, useEffect } from 'react';


import { useParams } from 'react-router-dom';

import VideoList from '../videoList/Videolist';
import './WatchVideoScreen.css';
function WatchVideoScreen({users,connection,videoList, setVideos, searchQuery}) {

  const { videoID } = useParams();
  const [videoPath, setVideoPath] = useState(videoList[videoID].path);
 
  const [shares, setShares] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  
  useEffect(() => {
    if (connection.isConnected && videoList[videoID].likedBy.includes(connection.user)) {
      setIsLiked(true);
      
    }else{
      setIsLiked(false);
     
    }
    if (connection.isConnected && videoList[videoID].dislikedBy.includes(connection.user)) {
      setIsDisliked(true);
    }else{
      setIsDisliked(false);
    }
  }, [connection.isConnected, videoPath, videoID, videoList[videoID].likedBy,videoList[videoID].dislikedBy,videoList]);
  
  useEffect(() => {
    setVideoPath(videoList[videoID].path);
    incrementViewCount();
  } , [videoID]);
  const incrementViewCount = () => {
    const newVideos = [...videoList];
    newVideos[videoID].views = newVideos[videoID].views + 1;
    setVideos(newVideos);
  };

  
  const handleLike = () => {
    if (!connection.isConnected) {
      alert('You need to be connected to like a video');
      return;
    }
    if (isLiked) {
      setIsLiked(false);
      const newVideos = [...videoList];
      newVideos[videoID].likes = newVideos[videoID].likes - 1;
      newVideos[videoID].likedBy = newVideos[videoID].likedBy.filter(user => user != connection.user);
      setVideos(newVideos);


      return;
    }
    const newVideos = [...videoList];
    newVideos[videoID].likedBy.push(connection.user);
    newVideos[videoID].likes = newVideos[videoID].likes + 1;
    setVideos(newVideos);
    if (isDisliked) {
      setIsDisliked(false);
      const newVideos = [...videoList];
      newVideos[videoID].dislikes = newVideos[videoID].dislikes - 1;
      newVideos[videoID].dislikedBy = newVideos[videoID].dislikedBy.filter(user => user != connection.user);
      setVideos(newVideos);


      return;
    }
  };


  const handleDislike = () => {
    if (!connection.isConnected) {
      alert('You need to be connected to dislike a video');
      return;
    }
    if (isDisliked) {
      setIsDisliked(false);
      const newVideos = [...videoList];
      newVideos[videoID].dislikes = newVideos[videoID].dislikes - 1;
      newVideos[videoID].dislikedBy = newVideos[videoID].dislikedBy.filter(user => user != connection.user);
      setVideos(newVideos);


      return;
    }
    const newVideos = [...videoList];
    newVideos[videoID].dislikedBy.push(connection.user);
    newVideos[videoID].dislikes = newVideos[videoID].dislikes + 1;
    setVideos(newVideos);
    if (isLiked) {
      setIsLiked(false);
      const newVideos = [...videoList];
      newVideos[videoID].likes = newVideos[videoID].likes - 1;
      newVideos[videoID].likedBy = newVideos[videoID].likedBy.filter(user => user != connection.user);
      setVideos(newVideos);


      return;
    }
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  const handleDownload = () => {
    setDownloads(downloads + 1);
  };

  const handleSubscribers = () => {
    setSubscribers(subscribers + 1);
  };

  const handleComment = () => {
    if (!connection.isConnected) {
      alert('You need to be connected to comment on a video');
      setCommentText('');
      return;
    }
    const newVideos = [...videoList];
    if (commentText.trim() !== '' && connection.isConnected) {
      const newComment = {
        commentID: videoList[videoID].commentsNum,
        author: users.find(user => user.username === connection.user).displayName,
        text: commentText,
        avatar: users.find(user => user.username === connection.user).profilePicture
      };

      const updatedVIdeoList = videoList.map(video => {
        if (video.index == videoID) {
          return {
            ...video,
            commentsNum: video.commentsNum + 1,
            comments: [...video.comments, newComment]
            
          };
        }
        return video;
      });
      setVideos(updatedVIdeoList);
      
      
    }
    setCommentText('');
  };
  const deleteComment = (index) => {
    const newVideos = [...videoList];
    newVideos[videoID].comments = newVideos[videoID].comments.filter((_, i) => i !== index);
    newVideos[videoID].commentsNum = newVideos[videoID].commentsNum - 1;
    setVideos(newVideos);
  }

  return (
    <div className='big-container'>
      <div className="watch-video-container">
        <div className="video-player">
          <video width="100%" src={videoPath} type="video/mp4" autoPlay controls></video>
        </div>
        <div className="video-info">
          <div className="button-container">
            <h1>Title: {videoList[videoID].title}</h1>
            <h3>By: {videoList[videoID].authorDisplayName}</h3>
            <h3>{videoList[videoID].views} views</h3>
            <h3>Published on {videoList[videoID].timeAgo}</h3>
            <button className={isLiked ? 'buttuonPressed' : ''} onClick={handleLike}>Like ({videoList[videoID].likes})</button>
            <button className={isDisliked ? 'buttuonPressed' : ''} onClick={handleDislike}>Dislike ({videoList[videoID].dislikes})</button>
            <button onClick={handleShare}>Share ({shares})</button>
            <button onClick={handleDownload}>Download ({downloads})</button>
            <button onClick={handleSubscribers}>Subscribers ({subscribers})</button>
            
          </div>
          <div className="comments-section">
            <h3>{videoList[videoID].commentsNum} Comments</h3>
            <div className="comment-input-container">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
              />
              <button onClick={handleComment}>Comment</button>
            </div>
            {videoList[videoID].comments.map((comment, index) => (
              <div key={index} className="comment"> 
                <img src={comment.avatar} alt="" />
                <span>{comment.author}</span>: {comment.text}
                <button className="deleteCommButton" onClick={() => deleteComment(index)} >X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="video-list-container">
        <div className="video-list">
          <VideoList videoList={videoList} searchQuery={searchQuery} users={users}/>
        </div>
      </div>
    </div>

  );
};

export default WatchVideoScreen;
