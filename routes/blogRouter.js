// modules
const express = require("express")
const router = express.Router()
const { cors, corsWithOption } = require("../middlewares/cors")

// controllers
    // GET controller //
var { getBlogs, getBlogById } = require("../controllers/blog/blogController")
var { getComments, getCommentById } = require("../controllers/blog/commentController")
    // POST controller //
var { postBlog, postBlogById } = require("../controllers/blog/blogController")
var { postComment, postCommentById } = require("../controllers/blog/commentController")
    // PUT controller //
var { updateBlog, updateBlogById  } = require("../controllers/blog/blogController")
var { updateComment, updateCommentById } = require("../controllers/blog/commentController")
    // DELETE controller //
var { delBlogs, delBlogById } = require("../controllers/blog/blogController")
var { delComments, delCommentById } = require("../controllers/blog/commentController")

router.route("/")
.options(corsWithOption, (req, res, next) => res.sendStatus(200))
.get(cors, getBlogs)
.post(corsWithOption, postBlog)
.put(corsWithOption, updateBlog)
.delete(corsWithOption, delBlogs)

router.route("/:id")
.get(cors, getBlogById)
.post(corsWithOption, postBlogById)
.put(corsWithOption, updateBlogById)
.delete(corsWithOption, delBlogById)

router.route("/:id/comments")
.get(cors, getComments)
.post(corsWithOption, postComment)
.put(corsWithOption, updateComment)
.delete(corsWithOption, delComments)

router.route("/:id/comments/:commentId")
.get(cors, getCommentById)
.post(corsWithOption, postCommentById)
.put(corsWithOption, updateCommentById)
.delete(corsWithOption, delCommentById)



module.exports = router