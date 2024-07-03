// Import the video service module
const videoService = require('../services/videos');
// Create a new video
const createVideo = async (req, res) => {
    res.json(await videoService.createVideo(req.body.title));
};

// Get all videos
const getVideos = async (req, res) => {
    res.json(await videoService.getVideos());
};

// Get a specific video by ID
const getVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

// Update a video by ID
const updateVideo = async (req, res) => {
    const video = await videoService.updateVideoById(req.params.id, req.body.title);
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

module.exports = { createVideo, getVideos, getVideo, updateVideo, deleteVideo };