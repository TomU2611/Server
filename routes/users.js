const express = require('express');
const userController = require('../controllers/users');

var router = express.Router();

router.route('/')
    .post(userController.createUser); // Create a new user

// Route for getting all users and creating a new user
router.route('/:id')
    .get(userController.getUserById) // Get a specific user
    .patch(userController.updateUser) // Update a specific user
    .delete(userController.deleteUser);  // Delete a specific user


router.route('/:id/videos')
    .get(userController.getUserVideos) // Get all videos of a user
    .post(userController.createUserVideo); // Create a new video for a user

router.route('/:id/videos/:pid')
    .get(userController.getUserVideo) // Get a specific video of a user
    .patch(userController.updateUserVideo)// Update a specific video of a user
    .delete(userController.deleteUserVideo); // Delete a specific video of a user

module.exports = router;

