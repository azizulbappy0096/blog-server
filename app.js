var express = require("express")
var path = require('path');
var logger = require('morgan');
var mongoose =require("mongoose")
var cookieParser = require("cookie-parser")
var session = require("express-session")
var MongoDBStore = require("connect-mongodb-session")(session)
var passport = require("passport")
var authenticate = require("./authenticate")
var socket = require("socket.io")
require("dotenv").config()

// --- routers
const indexRouter = require('./routes/index');
const blogRouter = require("./routes/blogRouter")
const usersRouter = require('./routes/usersRouter');
const uploadRouter = require("./routes/uploadRouter")

// initialize
var app = express();
const store = new MongoDBStore({
    uri: process.env.MONGOOSE_URL,
    collection: "sessions"
})

// db configuration
mongoose.connect(
    process.env.MONGOOSE_URL,
    {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },(err => {
        if(err) {
            console.log(err.message)
        }else {
            console.log("DB connected")
        }
    })
)

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blogs', blogRouter)
app.use('/api/upload', uploadRouter)


module.exports = app;


