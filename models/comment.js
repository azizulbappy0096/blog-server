// modules
const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timeStamps: true});

module.exports = mongoose.model("Comment", CommentSchema)