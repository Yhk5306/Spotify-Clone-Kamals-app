process.env.TZ = 'Europe/Istanbul'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')
const db = require('./config/config').MongoURI;
var SpotifyWebApi = require('spotify-web-api-node');
const Token = require('./models/Token');
var cookieParser = require('cookie-parser');

const SongRoute = require('./router/songsRouter')
const SpotifyRoute = require('./router/spotifyRouter');
const SearchRoute = require('./router/searchRouter');
const IndexRoute = require('./router/IndexRoute');
const PlayerRouter = require('./router/PlayerRouter');
const ArtistRouter = require('./router/artistRouter');

const app = express();


app.use(cookieParser());


app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(require('sanitize').middleware);
app.use(cors(
    {
        origin: ['http://localhost:8080'],
        methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
        credentials:true,
        }
))

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.json({limit:'50000mb'}));

app.use(SongRoute);
app.use(SpotifyRoute);
app.use(SearchRoute);
app.use(IndexRoute);
app.use(PlayerRouter);
app.use(ArtistRouter)

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];



// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUri: 'http://localhost:5000/callback/',
    state:generateRandomString(16)
});


//Refresh spotify token
async function refreshSpotifyToken() {
    const token = await Token.find({}).sort({createdAt:-1})
    spotifyApi.refreshAccessToken(token.refreshToken).then(
        async function(data) {
            console.log('The access token has been refreshed!');

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The token expires in ' + data.body['expires_in']);
            await Token.findOneAndUpdate({
                accessToken:data.body['access_token']
            }).then(result => {
                console.log(result,'access token refreshed')
            }).catch(err => {
                if (err){
                    console.log(err)
                }
            })
        },
        function(err) {
            console.log('Could not refresh access token', err);
        });
}




app.get('/get',async (req,res) => {
    const token = await Token.findOne().sort({createdAt:-1})
    if (token){
        await Token.deleteOne()
        res.redirect(spotifyApi.createAuthorizeURL(scopes))
    }else {
        res.redirect(spotifyApi.createAuthorizeURL(scopes))
    }
})

app.get('/callback',async (req, res) => {

    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;


    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }
    spotifyApi
        .authorizationCodeGrant(code)
        .then(async data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            spotifyApi.setAccessToken(access_token);


            const token = new Token({
                refreshToken:refresh_token,
                accessToken:access_token
            })
            await token.save()
            //Refresh Token
            await refreshSpotifyToken();
            setInterval(refreshSpotifyToken, 1000 * 59 * 59);
            res.status(200).send('Token gained successfully');
        })

        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

