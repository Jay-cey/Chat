const express = require('express');
const {registerUser, loginUser, findUser, getUsers} = require('../Controllers/userController');

const router = express.Router();

// Routing to /register using express
router.post('/register', registerUser);

// Routing to /login using express
router.post('/login', loginUser);

router.get('/find/:userId', findUser);
router.get('/', getUsers);

module.exports = router;