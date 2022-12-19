const Song = require('../models/Song');
var session = require('express-session')


const postSongs = async (req,res) => {
    try {
        const songs =await Song.create(req.body)
        console.log(songs)
        res.send(songs)
    }catch (err){
        if (err){
            console.log(err)
            res.status(500).send({
                error:'An error has occured trying to post the songs'
            })
        }
    }
}

const getSongs = async (req,res) => {
    try {
        const songs = await Song.find().limit(10).sort({createdAt:-1}).exec()
        res.send(songs)
    }catch (err){
        console.log(err)
        res.status(500).send({
            error:'An error has occured trying to fetch the songs'
        })
    }
}

const songDetail = async (req,res) => {
    try {
        const song = await Song.findById(req.params.songId)

        res.send(song)
    }catch (err){
        if (err){
            console.log(err)
            res.status(500).send({
                error:'An error has occured trying to go to song detail'
            })
        }
    }
}

const indexSongs =async (req,res) => {
    try {

        const songs = await Song.find({}).sort({createdAt:-1}).limit(15).exec()
        res.send(songs)
    }catch (err){
        if (err){
            console.log(err)
            res.status(500).send({
                error:'An error has occured trying to render songs in index file'
            })
        }
    }
}

const nowPlaying = async (req,res) => {
    try {
        console.log(req.body.playId)
        const isPlaying = await Song.findById(req.body.playId).select('title artist album albumImage').exec()
        console.log(isPlaying)
        res.send(isPlaying)
    }catch (err){
        if (err){
            console.log(err)
            res.status(500).send({
                error:'An error has occured trying to find to current song in player file'
            })
        }
    }
}

module.exports = {
    postSongs,
    getSongs,
    songDetail,
    indexSongs,
    nowPlaying
}
