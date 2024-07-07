const express = require('express');
const videosController = require('../controllers/videos');

var router = express.Router();

// Route for getting all videos and creating a new video
router.route('/')
    .get(videosController.getVideos) // Get all videos
    .post(videosController.createVideo); // Create a new video

// Route for getting, updating, and deleting a specific video by its ID
router.route('/:id')
    .get(videosController.getVideo) // Get a specific video
    .patch(videosController.updateVideo) // Update a specific video
    .delete(videosController.deleteVideo); // Delete a specific video

// Route for getting all videos that start with a specific prefix
router.route('/prefix/:prefix')
    .get(videosController.getVideosByPrefix); // Get all videos that start with a specific prefix

    
module.exports = router;

