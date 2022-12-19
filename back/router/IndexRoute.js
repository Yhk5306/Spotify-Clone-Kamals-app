const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

router.get('/getLatest',IndexController.getNewAlbums);
router.post('/userTopTracks',IndexController.getUsersTop);
router.post('/getTopArtists',IndexController.getTopArtists);
router.post('/MyPlaylists',IndexController.getMyPlayLists);

module.exports = router;