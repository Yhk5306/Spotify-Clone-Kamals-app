const express = require('express');
const ArtistController = require('../controllers/ArtistController')
const router = express.Router();

router.get('/artist/:artist',ArtistController.GetArtistDetail);
router.post('/followArtist',ArtistController.followArtist);
router.post('/unFollowArtist',ArtistController.unFollowArtist);
router.get('/top/:artist',ArtistController.getArtistTop);
router.get('/albums/:artist',ArtistController.artistAlbums);
router.get('/related/:artist',ArtistController.artistRelated);
router.post('/artistPlaylists',ArtistController.artistPlaylist);
router.post('/album/:albumId',ArtistController.albumDetail);

module.exports = router;