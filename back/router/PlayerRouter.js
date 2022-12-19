const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/PlayerController');
const AlgorithimController = require('../controllers/AlgorithmController');

router.post('/connectDevice',PlayerController.connectDevice);
router.get('/currentSong',PlayerController.GetCurrentTrack);
router.post('/changeSong',PlayerController.playTrack);
router.post('/play',PlayerController.Play);
router.post('/pause',PlayerController.Pause);
router.post('/likeTrack',PlayerController.Liked);
router.post('/removedLike',PlayerController.RemoveLike);
router.post('/volume',PlayerController.Volume);
router.post('/skipToNext',PlayerController.SkipToNext);
router.post('/SkipToPrevious',PlayerController.SkipToPrevious);
router.post('/Repeat',PlayerController.Repeat);
router.post('/Shuffle',PlayerController.Shuffle);
router.post('/changePosition',PlayerController.changePosition);
router.post('/changeQue',AlgorithimController.Queue);
router.get('/getQueue',AlgorithimController.getQueue);


module.exports = router;