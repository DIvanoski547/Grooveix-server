const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Album = require("../models/Album.model");
const Review = require("../models/Review.model");
const User = require("../models/User.model");

// POST route /albums/:albumId/review for adding a new review to a specific album by Id

router.post("/:albumId/create-review", isAuthenticated, (req, res, next) => {
  const { albumId } = req.params;
  const { content, rating } = req.body;
  const user = req.payload._id; // Correct capitalization for _id

  Review.create(
    { username: user, album: albumId, content, rating },
    { new: true }
  )
    .then((newReview) => {
      return Album.findByIdAndUpdate(
        albumId,
        { $push: { reviews: newReview._id } },
        { new: true } // Option to return the updated document
      );
    })
    .then((newReview) => {
      return User.findByIdAndUpdate(
        user,
        { $push: { reviews: newReview._id } },
        { new: true }
      );
    })
    .then((response) => {
      console.log(response);
      return res.json(response);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

//PUT

module.exports = router;
