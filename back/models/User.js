const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



const UserSchema = new Schema({
    email: {
        type: String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
    },

}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    const salt =await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

const User = mongoose.model('User', UserSchema);



module.exports = User;