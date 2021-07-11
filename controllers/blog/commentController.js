// module
var Comment = require("../../models/comment");

module.exports = {
  // GET metod
  getComments: (req, res, next) => {
    // get all comments from in a blog
    res.setHeader("Content-Type", "application/json");

    const { id } = req.params;
    Comment.find({ blogId: id })
      .then(
        (docs) => {
          if (docs === null) {
            let err = new Error(`Comments not found`);
            err.status = 404;
            next(err);
          } else {
            res.status(200).json({
              success: true,
              status: "All comments from different blogs",
              payload: {
                comments: docs,
              },
            });
          }
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  getCommentById: (req, res, next) => {
    // get a particular comment
    res.setHeader("Content-Type", "application/json");
    const { id, commentId } = req.params;

    Comment.findOne({ _id: commentId, blogId: id })
      .then(
        (doc) => {
          if (doc === null) {
            let err = `Comment - ${commentId} not found`;
            err.status = 404;
            next(err);
          } else {
            res.status(200).json({
              success: true,
              status: "Gotcha",
              payload: {
                comment: doc,
              },
            });
          }
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  // POST method
  postComment: (req, res, next) => {
    // post a comment
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;
    const { comment } = req.body;

    Comment.create({
      author: req.user,
      blogId: id,
      comment,
    })
      .then(
        (doc) => {
          res.status(200).json({
            success: true,
            status: "Comment has been posted",
            payload: {
              comment: doc,
            },
          });
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },
  postCommentById: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "Method is not allowed",
    });
  },

  // PUT method
  updateComment: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "Method is not allowed",
    });
  },

  updateCommentById: (req, res, next) => {
    // update a particular comment
    res.setHeader("Content-Type", "application/json");
    const { id, commentId } = req.params;
    const { comment } = req.body;

    Comment.findOneAndUpdate(
      { _id: commentId, blogId: id },
      { $set: { comment } },
      { new: true }
    )
      .then(
        (doc) => {
          if (doc === null) {
            let err = new Error(`Comments not found`);
            err.status = 404;
            next(err);
          } else {
            res.status(200).json({
              success: true,
              status: "Comment has been updated",
              payload: {
                comment: doc,
              },
            });
          }
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  // DELETE method
  delComments: (req, res, next) => {
    // delete all comments from db
    res.setHeader("Content-Type", "application/json");
    const { id, commentId } = req.params;

    Comment.deleteMany({ blogId: id })
      .then(
        (doc) => {
          res.status(200).json({
            success: true,
            status: `Comments from BlogId: ${id} has been deleted`,
            payload: {
              comment: doc,
            },
          });
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },

  delCommentById: (req, res, next) => {
    // delete a particular comment
    res.setHeader("Content-Type", "application/json");
    const { id, commentId } = req.params;

    Comment.deleteOne({ _id: commentId, blogId: id })
      .then(
        (doc) => {
          if (doc === null) {
            let err = new Error(`CommentId ${commentId} not found`);
            err.status = 404;
            next(err);
          } else {
            res.status(200).json({
              success: true,
              status: `CommentId ${commentId} from BlogId: ${id} has been deleted`,
              payload: {
                comment: doc,
              },
            });
          }
        },
        (networkError) => next(networkError)
      )
      .catch((err) => next(err));
  },
};
