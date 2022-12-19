const SpotifyWebApi = require('spotify-web-api-node')
const Token = require('../models/Token');

//Search tracks by name
const search = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(token.accessToken);
    const search = req.params.search

    spotifyApi.search(search, ['track','artist','playlist'], { limit : 8 }).then((result) => {
        const track = result.body.tracks;
        const artist = result.body.artists;
        const playlists = result.body.playlists;
        res.status(200).send({tracks:track,artists:artist,playlists:playlists})
    })
}


module.exports = {
    search,
}
