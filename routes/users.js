const express = require('express');
const userController = require('../controllers/users');
const multer = require('multer');
const path = require('path');

var router = express.Router();

// Multer configuration for video uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/videos'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /mp4|avi|mkv/; // Add more video formats if needed
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Videos Only!');
        }
    }
});

router.route('/')
    .post(userController.createUser); // Create a new user

// Route for getting all users and creating a new user
router.route('/:id')
    .get(userController.getUserById) // Get a specific user
    .patch(userController.updateUser) // Update a specific user
    .delete(userController.deleteUser);  // Delete a specific user
router.route('/:id/username')
    .get(userController.getUserByUsername); // Get a specific user by username
router.route('/:id/videos')
    .get(userController.getUserVideos) // Get all videos of a user
    .post(upload.single('video'), userController.createUserVideo); // Create a new video for a user

router.route('/:id/videos/:pid')
    .get(userController.getUserVideo) // Get a specific video of a user
    .patch(userController.updateUserVideo)// Update a specific video of a user
    .delete(userController.deleteUserVideo); // Delete a specific video of a user

module.exports = router;

