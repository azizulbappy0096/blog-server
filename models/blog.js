// modules
const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    images: [],
    preview: {
        type: String,
    },
    previewImage: {
        type: String,
    },
    tags: [],
    draft: {
        type: Boolean,
        default: true
    },
    likes: {
        type: Number,
        default: 0
    },
}, {timestamps: true});


module.exports = mongoose.model("Blog", BlogSchema)