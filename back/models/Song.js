const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const SongSchema = new Schema({
    title: {type:String},
    artist:{type:String},
    genre:{type:String},
    album:{type:String},
    albumImage:{type:String},
    youtubeId:{type:String},
    lyrics:{type:String},
    tab:{type:String}

}, {timestamps: true});



const Song = mongoose.model('Song', SongSchema);



module.exports = Song;