// Import the video service module
const videoService = require('../services/videos');
// Create a new video
const createVideo = async (req, res) => {
    res.json(await videoService.createVideo(
        req.body.title,
        req.body.author,
        req.body.path,
        req.body.authorDisplayName,
        req.body.photoPath
    ));
};

// Get all videos
const getVideos = async (req, res) => {
    res.json(await videoService.getVideos());
};

// Get a specific video by ID
const getVideo = async (req, res) => {
    console.log(1);
    console.log(req.params.id);
    const video = await videoService.getVideoById(req.params.id);
    video.views += 1;
    await video.save();
    console.log(video);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

// Update a video by ID
const updateVideo = async (req, res) => {
    const video = await videoService.updateVideo(req.params.id, req.body.title, req.body.views, req.body.likes, req.body.likedBy, req.body.dislikes, req.body.dislikedBy);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video); //not sure if this is correct
};

// Delete a video by ID
const deleteVideo = async (req, res) => {
    const video = await videoService.deleteVideoById(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video); //not sure if this is correct
};
// Get all videos that start with a specific prefix
const getVideosByPrefix = async (req, res) => {
    res.json(await videoService.getVideosByPrefix(req.params.prefix));
}

module.exports = { createVideo, getVideos, getVideo, updateVideo, deleteVideo, getVideosByPrefix };