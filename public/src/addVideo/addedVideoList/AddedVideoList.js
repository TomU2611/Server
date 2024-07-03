import AddVideoItem from './addVideoItem/AddVideoItem';
import './AddedVideoList.css';

function AddedVideoList({ videoList, setVideos, users, connection }) {
    const deleteVideo = (index) => {
        //setVideosList((prevVideos) => prevVideos.filter((_, i) => i !== index));
        const newVideos = [...videoList];
        newVideos.splice(index, 1);
        setVideos(newVideos);

    };
    return (
        <div className="AddedVideoList">
            <div className="AddedVideoListHeader">
                        <div className="headerItem">Title</div>
                        <div className="headerItem">Views</div>
                        <div className="headerItem">Likes</div>
            </div>
            { videoList.length > 0 ? (
                <div>
                    {videoList.map((video, index) => (
                        video.author == connection.user &&
                        <AddVideoItem key={index} videoList={videoList} index={index} deleteVideo={deleteVideo} />
                    ))}
                </div>
            ) : (
                <p>No videos added yet.</p>
            )}
        </div>
    );
}

export default AddedVideoList;
