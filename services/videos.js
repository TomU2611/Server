const Video = require('../models/videos');

const createVideo = async (title, author, path, authorDisplayName, photoPath) => {
    const video = new Video({
         title: title,
         author: author, 
         authorDisplayName: authorDisplayName,
         photo: photoPath,
         path: path
        }
    );
    return await video.save();
};
const getVideoById = async (id) => { return await Video.findById(id); };
const getVideos = async () => { 
    const videos =  await Video.find({}); 
    return getTopAndRandomVideos(videos);
};
const updateVideo = async (id, title, views, likes, likedBy, dislikes,dislikedBy) => {
    const video = await getVideoById(id);
    if (!video) return null;
    video.title = title;
    video.views = views;
    video.likes = likes;
    video.likedBy = likedBy;
    video.dislikes = dislikes;
    video.dislikedBy = dislikedBy;
    await video.save();
    return video;
};

const deleteVideo = async (id) => {
    const result = await Video.findByIdAndDelete(id);
    if (!result) return null;
    return true;
};
const deleteUsersVideos = async (username) => {
    const videos = await Video.find({ author: username });
    for (let video of videos) {
        await video.remove();
    }
};

const getVideosByPrefix = async (prefix) => {
    const videos = await Video.find({ title: { $regex: `^${prefix}`, $options: 'i' } });
    return getTopAndRandomVideos(videos);
};
const getVideosByAuthor = async (username) => {
    return await Video.find({ author: username });
}




const getTopAndRandomVideos = (videosArray) => {
    // Sort videos by views in descending order and take the top 10
    const top10Videos = videosArray
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

    // Get the remaining videos after removing the top 10
    const remainingVideos = videosArray.filter(video => !top10Videos.includes(video));

    // Shuffle the remaining videos to select 10 random ones
    const shuffledVideos = remainingVideos.sort(() => 0.5 - Math.random());

    // Take the first 10 random videos
    const random10Videos = shuffledVideos.slice(0, 10);

    // Combine top 10 and random 10
    return [...top10Videos, ...random10Videos];
};


module.exports = { createVideo, getVideosByAuthor ,getVideoById, getVideos, updateVideo, deleteVideo, getVideosByPrefix, deleteUsersVideos }