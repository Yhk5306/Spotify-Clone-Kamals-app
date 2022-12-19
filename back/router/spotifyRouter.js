const express = require('express');
const router = express.Router();
const SpotifyController = require('../controllers/SpotifyController');


router.get('/spoti-profile',SpotifyController.getProfile);
router.get('/play-list',SpotifyController.getPlayLists);
router.get('/play-list/:trackId',SpotifyController.getPlayListTracks);
router.post('/album-details/:trackId',SpotifyController.playlistDetails);
router.get('/token',SpotifyController.getToken);
router.post('/liked',SpotifyController.favoriteSongs);

//Player


module.exports = router;