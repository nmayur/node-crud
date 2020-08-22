const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
// import and initiate the posts model to query the database
const Posts = mongoose.model("posts");

// function for base route on "/"
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

// function to get posts on route "/getPosts"
exports.getPosts = async (req, res) => {
  const posts = await Posts.find();
  res.json(posts);
};

// function to create a post
exports.createPost = async (req, res) => {
  // we use mongodb's save functionality here
  await new Posts(req.body).save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      res.status(200).json({
        message: "Post Created",
        data,
      });
    }
  });
};

// function to get a single post
exports.getSinglePost = async (req, res) => {
  // get id from URL by using req.params
  let postID = req.params.id;
  // we use mongodb's findById() functionality here
  await Posts.findById({ _id: postID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      console.log(data);      
      res.status(200).json({
        message: "Post found",
        data
      });
    }
  });
};

// function to update a single post
exports.updatePost = async (req, res) => {
  // get a postID.
  let postID = req.params.id;

  // we will use findByIdAndUpdate function : findByIdAndUpdate(id, data, callback)
  await Posts.findByIdAndUpdate({_id: postID}, {$set : req.body}, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      res.status(200).json({
        message: "Post Updated",
        data,
      });
    }
  });
}

// function to delete a post from the DB
exports.deletePost = async (req, res) => {
  let postID = req.params.id;
  // we use mongodb's deleteOne() functionality here
  await Posts.deleteOne({ _id: postID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      res.status(200).json({
        message: "Post Deleted"
      });
    }
  });
};
