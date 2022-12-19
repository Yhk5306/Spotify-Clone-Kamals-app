const SpotifyWebApi = require('spotify-web-api-node')
const Token = require('../models/Token');
const requestify = require('requestify');

const shuffleArr = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function uniq(a) {
    return Array.from(new Set(a));
}
// The logic in the Queue gets the current artist top tracks and random selects 5 and then goes to genre and finds 2 playlists and then randomizes these lists and gets 10 tracks
// Lastly we unite the artist tracks and genre playlist and then we add queue on spotify


const Queue = async (req, res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();
    let CurrentSong = '';
    let Artist = '';
    let GenreLists = '';
    let ArtistsTop = '';


    spotifyApi.setAccessToken(token.accessToken);



    const ArtistId = req.body.artist;

    //  Get main artist top songs
    await spotifyApi.getArtistTopTracks(ArtistId,'US').then( (data) => {
        const getItems = data.body.tracks;

        //Get random arrays
        let shuffle = getItems.sort(() => 0.5 - Math.random());


        let selected = shuffle.slice(0,5);

        ArtistsTop = selected
    })


    await spotifyApi.getArtist(ArtistId)
        .then(function (data) {
            Artist = data
        })

    console.log(Artist.body.genres[0])
    const getGenre = Artist.body.genres[0] ;

    //get playlist by genre
    await spotifyApi.searchPlaylists(getGenre,{limit:5}).then(function (data) {
        var shuffle = data.body.playlists.items.sort(() => 0.5 - Math.random());
        GenreLists = shuffle.slice(0,2)
    })

    var playListIds = [];
    for (var i = 0; i < GenreLists.length; i++){
        playListIds.push(GenreLists[i].id)
    }


    var trackList = [];

    for (var i = 0 ; i < playListIds.length; i++){
        const GetPlaylists = await spotifyApi.getPlaylist(playListIds[i],{limit:5,market:'US'})
        trackList.push(GetPlaylists);
    }



    const arrange = trackList[0].body.tracks.items.concat(trackList[1].body.tracks.items);
    var randomTracks = await shuffleArr(arrange).slice(0,10)

    let getTracks = []

    for (var i = 0; i < randomTracks.length;i++){
        getTracks.push(randomTracks[i].track)
    }


    var result = ArtistsTop.concat(getTracks)

    var random = await shuffleArr(result);

    res.status(200).send(random)

    //First we give the response and then we add to spotify cause of the performance issues
    for (var i = 0;  i < random.length; i++){
        await spotifyApi.addToQueue(random[i].uri)
        console.log('added',i+1)
    }


}

const getQueue = async (req,res) => {
    const token = await Token.findOne({}).sort({createdAt:-1});
    const spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(token.accessToken);

    //Normally there isn't method for getQueue if you want to use spotify-web-api-node you can add this code on spotify-web-api-node
    /*
        getQueue:function (callback){
        return WebApiRequest.builder(this.getAccessToken())
            .withPath('/v1/me/player/queue')
            .build()
            .execute(HttpManager.get,callback)
        },
     */

    // or you can use this function
    await requestify.request('https://api.spotify.com/v1/me/player/queue', {
        method: 'GET',
        dataType: 'json',
        headers :{
            Authorization:"Bearer " + token.accessToken // token
        }
    }).then(async function (data) {
        res.status(200).send(data.body)
    })
}



module.exports = {
    Queue,
    getQueue,
}