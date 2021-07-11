// modules
const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")

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

router.post("/", upload.single("upload"), uploadImage)

module.exports = router