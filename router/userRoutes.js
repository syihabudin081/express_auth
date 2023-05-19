const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authorizeToken} = require("../middleware/middlewares");

// Register a new user
router.post('/register', userController.registerUser);

// Login and generate JWT token
router.post('/login', userController.loginUser);
router.get('/get', authorizeToken,userController.getUser);
module.exports = router;