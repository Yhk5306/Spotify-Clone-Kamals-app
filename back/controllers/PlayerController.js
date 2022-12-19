const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node')
const Token = require('../models/Token');

const connectDevice = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);

    let device = '';

    await spotifyApi.getMyDevices()
        .then(function(data) {
            let availableDevices = data.body.devices;
            device = availableDevices
        }, function(err) {
            console.log('Something went wrong!', err);
        });





    const device_id = device.find(o => o.name === 'Kamals app');
    console.log(device)
    console.log(device_id.id)

    await spotifyApi.transferMyPlayback([device_id.id])
        .then(function() {
            console.log('Transfering playback to ' + device_id);
        },async function(err) {
            await spotifyApi.transferMyPlayback(device_id)
        });

    res.status(200)

    //Waiting for spotify to create new device for our app


}


const GetCurrentTrack = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.getMyCurrentPlaybackState()
        .then((data) => {
            if (data.body && data.body.is_playing) {
                res.status(200).send(data.body)
            } else {
                res.status(200).send(data.body)
            }
        })
}

const playTrack = async (req,res) => {
    const {uri,trackNumber} = req.body;
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    const getAlbumNumber = trackNumber - 1;

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.play({
        "context_uri": uri,
        "offset":{
            "position":getAlbumNumber,
        },
        "position_ms": 0
    })
        .then(function() {
            res.status(200).send('changed')
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });

}


const Play = async (req,res,next) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.play()
        .then(function() {
            console.log('Playback started');
            res.status(200).send('playing')

        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

const Pause = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.pause()
        .then(function() {
            console.log('Playback paused');
            res.status(200).send('paused')
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}


//                                             !!!! WARNING  !!!!!
// Unfortunately couldn't find the liked songs playlist id so i ve created new playlist for liked songs you can add another playlist or create one like me

const Liked = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    const track = req.body.track;
    spotifyApi.addTracksToPlaylist('6uK92ZDMLHIKib1w5N78Wu', [track])
        .then(function(data) {
            res.status(200).send({added:'Added track to playlist!'})
        }, function(err) {
            console.log('Something went wrong!', err);
        });

}

const RemoveLike = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    var tracks = [{ uri : req.body.track }];
    var playlistId = '6uK92ZDMLHIKib1w5N78Wu';
    spotifyApi.removeTracksFromPlaylist(playlistId, tracks)
        .then(function(data) {
            res.status(200).send({removed:'Track removed from playlist!'})
            console.log('Track removed from playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

const Volume = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    var volume = req.body.volume;
    console.log(volume)
    spotifyApi.setVolume(volume)
        .then(function () {
            res.status(200).send('Setting volume to  '+volume+'.')
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

const SkipToNext = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.skipToNext()
        .then(function(next) {
            console.log('Skip to next');
            res.status(200).send('next')

        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

const SkipToPrevious = async (req,res,next) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.skipToPrevious()
        .then(function(next) {
            res.status(200).send('previous')
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

const Repeat = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRepeat('track')
        .then(function () {
            res.status(200).send('repeat')
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

const Shuffle = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setShuffle(true)
        .then(function() {
            res.status(200).send('shuffle');
        }, function  (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}


const changePosition = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);

    const position = req.body.position;

    await spotifyApi.seek(position)
        .then(function() {
            res.status(200).send('changed')
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}


module.exports = {
    connectDevice,
    GetCurrentTrack,
    playTrack,
    Play,
    Pause,
    Liked,
    RemoveLike,
    Volume,
    SkipToNext,
    SkipToPrevious,
    Repeat,
    Shuffle,
    changePosition
}