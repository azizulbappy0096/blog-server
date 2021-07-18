// modules
const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    followers: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
})

module.exports = mongoose.model("User", UserSchema)