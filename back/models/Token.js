const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const TokenSchema = new Schema({
    refreshToken:{type:String},
    accessToken:{type:String}
}, {timestamps: true});



const Token = mongoose.model('Token', TokenSchema);



module.exports = Token;