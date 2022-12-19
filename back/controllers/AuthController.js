const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const bcrypt = require('bcrypt')


function jwtSingUser(user){
    return jwt.sign(user.toJSON(),config.auth.jwtSecret,{
        expiresIn: 604800 // 1 week
    })
}

const register =async (req,res) => {
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.send({
            user:user,
            token:jwtSingUser(user)
        })
    }catch (err){
        if (err){
            console.log(err)
            res.status(400).send({
                error:'Please fill all the inputs'
            })
        }
    }
}

const login =async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({
            email:email
        })

        if (!user){
            return res.status(403).send({
                error:'The Login information is wrong'
            })
        }

        const isPasswordValid = await bcrypt.compare(password,  user.password)
        if (!isPasswordValid){
            return res.status(403).send({
                error:'The Login information is wrong'
            })
        }

        res.send({
            user:user,
            token:jwtSingUser(user)
        })
    }catch (err){
        console.log(err)
        res.status(500).send({
            error:'An error has occured trying to log in'
        })
    }
}

module.exports = {
    register,
    login
}