const express = require('express');
const SongConttroller = require('../controllers/SongConttroller')
const router = express.Router();

router.post('/songs',SongConttroller.postSongs);
router.get('/songs',SongConttroller.getSongs);
router.get('/songs/:songId',SongConttroller.songDetail);
router.get('/',SongConttroller.indexSongs);
router.post('/playing',SongConttroller.nowPlaying)


module.exports = router;