// modules
var Blog = require("../../models/blog");

module.exports = {
  // GET method
  getBlogs: (req, res, next) => {
    // get all blogs
    res.setHeader("Content-Type", "application/json");
    Blog.find({})
      .then(
        (docs) => {
          res.status(200).json({
            success: true,
            status: "All users blog",
            payload: {
              blogs: docs,
            },
          });
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  getBlogById: (req, res, next) => {
    // get particluar blog by it's id
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;

    Blog.findById(id)
      .populate("author")
      .then(
        (doc) => {
          console.log(doc);
          if (doc === null) {
            let err = new Error(`Blog - ${id} not found`)
            err.status = 404
            next(err)
          } else {
            res.status(200).json({
              status: "Gotcha",
              success: true,
              payload: {
                blog: doc,
              },
            });
          }
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  // POST method
  postBlog: (req, res, next) => {
    // post a blog
    res.setHeader("Content-Type", "application/json");
    const { title, body, draft } = req.body;

    Blog.create({
      author: req.user,
      title,
      body,
      draft,
    })
      .then(
        (doc) => {
          res.status(200).json({
            success: true,
            status: "Blog has been posted...",
            payload: {
              blog: doc,
            },
          });
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  postBlogById: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
        status: "Method is not allowed"
    })
  },

  // PUT method
  updateBlog: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
        status: "Method is not allowed"
    })
  },

  updateBlogById: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;
    const { title, body } = req.body;

    Blog.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(
        (doc) => {
          if(doc === null) {
              let err = new Error(`Blog - ${id} not found`)
              err.status = 404
              next(err)
          }else {
            res.status(200).json({
                success: true,
                status: "Blog has been updated",
                payload: {
                  blog: doc,
                },
              });
          }
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  // DELETE method
  delBlogs: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    Blog.deleteMany({})
      .then(
        (docs) => {
          res.status(200).json({
            success: true,
            status: "All blogs has been deleted",
            payload: {
              blogs: docs,
            },
          });
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  delBlogById: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params

    Blog.findByIdAndDelete(id)
    .then(doc => {
        if(doc === null) {
            let err = new Error(`Blog - ${id} not found`)
            err.status = 404
            next(err)
        }else {
            res.status(200).json({
                success: true,
                status: "Blog has been deleted",
                payload: {
                  blogs: doc,
                },
            });
        }
        
    }, (networkError) => next(networkError))
    .catch(err => next(err))
  }
};
