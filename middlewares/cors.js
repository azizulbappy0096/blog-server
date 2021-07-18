// modules
const cors = require("cors")

let whiteList = [
    "http://localhost:3000",
    "https://localhost:3443",
    "http://localhost:3001"
]

const corsOptionsDelegate = (req, cb) => {
    let corsOption;

    if(whiteList.indexOf(req.header("Origin")) === -1) {
        corsOption = {
            origin: false
        }
    }else {
        corsOption = {
            origin: true,
            credentials: true,
            optionsSuccessStatus: 200
        }
    }
    console.log("cors", corsOption)
    console.log("cors", req.header("Origin"))
    cb(null, corsOption)
}

exports.cors = cors();
exports.corsWithOption = cors(corsOptionsDelegate)