const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const AuthMW = require('../middlewares/AuthMW');

router.get('/watchList', AuthMW, userController.getWatchList);
router.post('/watchList/:movieId', AuthMW, userController.toggleWatchList);

module.exports = router;
