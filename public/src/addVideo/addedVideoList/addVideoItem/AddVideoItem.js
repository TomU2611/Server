import React from 'react';
import './AddVideoItem.css';

function AddVideoItem({ videoList, index, deleteVideo }) {
    return (
        <div className="AddedVideoItem">
            <img src={videoList[index].photo} className="videoPhoto" />
            <div className="videoDetails">
                <div className="videoTitle">{videoList[index].title}</div>
                <div className="videoViews">{videoList[index].views}</div>
                <div className="videoTimeAgo">{videoList[index].likes}</div>
                <div className="videoActions">
                    <button className="deleteButton" onClick={() => deleteVideo(index)}>X</button>
                </div>
            </div>
        </div>
    );
}

export default AddVideoItem;
