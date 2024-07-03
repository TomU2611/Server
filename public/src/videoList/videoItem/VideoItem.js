import React from 'react';
import './VideoItem.css';

//display the video item
function VideoItem({ title, author, authorDisplayName, views, timeAgo, photo, users}) {
    
    
    
    return (
        <div className="VideoItem">
        <img src={photo} alt={title} />
            <div>{title}</div>
            <p>{authorDisplayName}</p>
            <p>{views} Views - {timeAgo}</p>
        </div>
    );
}

export default VideoItem;