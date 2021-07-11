// modules
const express = require("express")
const router = express.Router()

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
.get(getBlogs)
.post(postBlog)
.put(updateBlog)
.delete(delBlogs)

router.route("/:id")
.get(getBlogById)
.post(postBlogById)
.put(updateBlogById)
.delete(delBlogById)

router.route("/:id/comments")
.get(getComments)
.post(postComment)
.put(updateComment)
.delete(delComments)

router.route("/:id/comments/:commentId")
.get(getCommentById)
.post(postCommentById)
.put(updateCommentById)
.delete(delCommentById)



module.exports = router