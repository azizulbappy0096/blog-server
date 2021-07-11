

module.exports = {
  uploadImage: (req, res, next) => {
    console.log("Uploaded file")
    console.log(req.file)
    let fullUrl = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename
    res.status(200).json({
        uploaded: true,
        url: fullUrl
    })
  }
}


