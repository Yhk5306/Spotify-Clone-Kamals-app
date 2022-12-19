const SpotifyWebApi = require('spotify-web-api-node')
const Token = require('../models/Token');



const getNewAlbums = async (req,res) => {

    const token = await Token.findOne({}).sort({createdAt:-1});

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.getNewReleases({ limit : 6, offset: 0, country: 'US' })
        .then(function(data) {
            res.status(200).send(data.body)
        }, function(err) {
            console.log("Something went wrong!", err);
        })
}

const getUsersTop = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    var offset = req.body.offset;

    // if (!cart){
    //     console.log('cart is not defined yet')
    // }else {
    //     console.log(cart)
    // }

    await spotifyApi.getMyTopTracks({ limit:8})
        .then(function(data) {
            let topTracks = data.body;
            if (offset){
                topTracks = data.body.items
            }else {
                topTracks = data.body
            }
            res.status(200).send({topTracks:topTracks})
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}


/* Get a User’s Top Artists*/

const getTopArtists = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);


    spotifyApi.getMyTopArtists({
        limit : 8,
    })
        .then(function(data) {
            let topArtist = data.body;
            res.status(200).send({categories:topArtist})
        }, function(err) {
            console.log("Something went wrong!", err);
            res.status(404)
        });
}

const getMyPlayLists = async (req,res,userName) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
    var offset = req.body.offset;

    await spotifyApi.getUserPlaylists(userName,{
        limit : 8,
    }).then(function(data) {
            let playlists = '';
            if (offset){
                playlists = data.body.items
            }else {
                playlists = data.body
            }
            res.status(200).send({playlists:playlists})
        },function(err) {
            console.log('Something went wrong!', err);
        });
}


module.exports = {
    getNewAlbums,
    getUsersTop,
    getTopArtists,
    getMyPlayLists
}