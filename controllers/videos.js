// Import the video service module
const videoService = require('../services/videos');


// Get all videos
const getVideos = async (req, res) => {
    try {
        res.status(200).json(await videoService.getVideos());

    } catch (err) {
        res.status(500).json({ errors: ['Videos not found'] });
    }
};
const getVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    await video.save();
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    video.views += 1;
    
    res.status(200).json(video);
};

// Get all videos that start with a specific prefix
const getVideosByPrefix = async (req, res) => {
    res.status(200).json(await videoService.getVideosByPrefix(req.params.prefix));
}

module.exports = { getVideos, getVideo, getVideosByPrefix };