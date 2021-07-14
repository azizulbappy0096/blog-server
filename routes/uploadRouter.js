// modules
const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const { cors, corsWithOption } = require("../middlewares/cors")

// controllers
const { uploadImage } = require("../controllers/uploadController")

// multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage })
router.options("*", corsWithOption, (req, res, next) => res.sendStatus(200))
router.post("/", corsWithOption, upload.single("upload"), uploadImage)

module.exports = router