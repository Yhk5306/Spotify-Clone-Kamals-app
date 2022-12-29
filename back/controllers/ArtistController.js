const SpotifyWebApi = require('spotify-web-api-node')
const Token = require('../models/Token');

const GetArtistDetail = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(token.accessToken);

    const artist = req.params.artist

    const getArtist = await spotifyApi.getArtist(artist).catch(err => {                 //Get artist details by id
        if (err){
            console.log(err)
        }
    })


    res.status(200).send({artist:getArtist.body})

}

const followArtist = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    const artist = req.body.artist;
    console.log(artist)
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.followArtists([artist])
        .then(function(data) {
            res.status(200).send({added:'Added to library'})
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

const unFollowArtist = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    const artist = req.body.artist;
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.unfollowArtists([artist])
        .then(function(data) {
            res.status(200).send({removed:'Removed from library'})
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

const getArtistTop = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    const artist = req.params.artist;
    spotifyApi.setAccessToken(token.accessToken);

    await spotifyApi.getArtistTopTracks(artist , 'US')
        .then(function(data) {
            res.status(200).send(data.body)
        }, function(err) {
            console.log('Something went wrong!', err);
        });

}

const artistAlbums = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    const artist = req.params.artist;
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi
        .getArtistAlbums(artist)
        .then(
            function(data) {
               res.status(200).send(data.body)
            },
            function(err) {
                console.error(err);
            }
        );
}

//Cannot get artist playlists from spotify api so we are getting from search
const artistPlaylist = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(token.accessToken);
    const artist = req.body.artist // Artist name


    //Search playlists by artist name
    spotifyApi.search(artist, ['playlist'], { limit : 8 }).then((result) => {
        res.status(200).send(result.body)
    })
}

const artistRelated = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    const artist = req.params.artist;
    spotifyApi.setAccessToken(token.accessToken);

    spotifyApi.getArtistRelatedArtists(artist)
        .then(function(data) {
            res.status(200).send(data.body)
        }, function(err) {
            console.log(err);
        });
}

const albumDetail = async (req,res) => {
    try {
        const token = await Token.findOne({}).sort({createdAt:-1});
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token.accessToken);
        let {offset} = req.body
        if (offset === undefined){
            offset = 0
        }
        console.log(req.params.albumId)
        await spotifyApi.getAlbum(req.params.albumId,         //album id goes here
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

module.exports = {
    GetArtistDetail,
    followArtist,
    unFollowArtist,
    getArtistTop,
    artistAlbums,
    artistPlaylist,
    artistRelated,
    albumDetail
}