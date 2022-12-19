const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node')
const Token = require('../models/Token');
const https = require('https')




//GET MY PROFILE DATA
const getProfile = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    (async () => {
        const me = await spotifyApi.getMe();
        // console.log(me.body);
        res.send(me.body.id)
    })().catch(e => {
        console.error(e);
    });
}
//GET MY PLAYLISTS
const getPlayLists = async (req,res,userName) => {
    try {
        const token =await Token.findOne({}).sort({createdAt:-1});

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token.accessToken);
        const data = await spotifyApi.getUserPlaylists(userName)

        const albums = data.body.items
        res.status(200).send(albums)
    }catch (err){
        if (err){
            console.log(err)
            res.send({error: err})
        }
    }

}



//Get songs from playlist
const getPlayListTracks = async (req,res) => {
    try {
        const token = await Token.findOne({}).sort({createdAt:-1});

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token.accessToken);
        await spotifyApi.getPlaylist(req.params.trackId, {
            limit: 20,
        }).then(function (data) {
            res.status(200).send(data.body)
            // return tracks;
        })

    }catch (err){
        if (err){
            console.log(err)
            res.status(400)
        }
    }

}

//Get playlist detail on playlist details
const playlistDetails = async (req,res) => {
    try {
        const token = await Token.findOne({}).sort({createdAt:-1});
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token.accessToken);
        let {offset} = req.body
        if (offset === undefined){
            offset = 0
        }
        await spotifyApi.getPlaylistTracks(req.params.trackId,         //album id goes here
            {
                limit:20,
                offset:offset
            }
        ).then(data => {
            const album = data.body
            res.status(200).send(album)
        });
    }catch (err){
        if (err){
            console.log(err)
        }
    }
}




const getToken = async (req,res) => {
    const token = await Token.findOne().sort({createdAt:-1})
    res.status(200).send({token:token.accessToken})
}



//Get users Favorite Songs
const favoriteSongs = async (req,res) => {
    let {offset} = req.body
    if (offset === undefined){
        offset = 0
    }
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);

    spotifyApi.getMySavedTracks({
        limit : 25,
        offset: offset
    })
        .then(function(data) {
            res.status(200).send(data.body)
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}



module.exports={
    getProfile,
    getPlayLists,
    getPlayListTracks,
    playlistDetails,
    getToken,
    favoriteSongs,
}
