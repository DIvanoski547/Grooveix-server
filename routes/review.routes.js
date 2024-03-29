const router = require("express").Router();
//import middleware
const { isAuthenticated } = require("../middleware/jwt.middleware");
//import data models
const Album = require("../models/Album.model");
const Review = require("../models/Review.model");
const User = require("../models/User.model");

// GET route to retrieve a specific review by id
router.get("/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Review.findById(reviewId)
    .then((foundReview) => res.status(200).json(foundReview))
    .catch((err) => {
      console.log("Error while retrieving review", err);
      res.status(500).json({ message: "Error while retrieving review" });
    });
});

// POST route /reviews for adding a new review to a specific album by Id
router.post("/", isAuthenticated, (req, res, next) => {
  const { albumId, rating, content } = req.body;
  const user = req.payload._id; // Correct capitalization for _id

  Review.create(
    { username: user, albumId, rating, content }
  )
    .then(async (newReview) => {
      await Album.findByIdAndUpdate(
        albumId,
        { $push: { reviews: newReview._id } },
        { new: true } // Option to return the updated document
      );
      await User.findByIdAndUpdate(
        user,
        { $push: { reviews: newReview._id } },
        { new: true }
      );
      res.status(200).json(response);
    })
    .catch((err) => {
      console.error("Error adding review", err);
      return res.status(500).json({ message: "Error adding review" });
    });
});

//PUT route /reviews/:reviewId that updates specific review by Id
router.put("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Review.findByIdAndUpdate(reviewId, req.body, { new: true })
    .then((updatedReview) => res.status(200).json(updatedReview))
    .catch((err) => {
      console.log("Error while updating review", err);
      res.status(500).json({ message: "Error while updating review" });
    });
});

//DELETE route /reviews/:reviewId to remove a specific review by id and remove it from user and album's reviews
router.delete("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Review.findByIdAndDelete(reviewId)
    .then(async (foundReview) => {
      const updatedUser = await User.findByIdAndUpdate(foundReview.username._id, {
        $pull: { reviews: reviewId },
      });

      const updatedAlbum = await Album.findByIdAndUpdate(foundReview.album._id, {$pull: {reviews: reviewId}})
      // async/await + const updatedUser remove the review from the user's reviews property
      // $pull removes value/item from array, removes reviewId from array reviews
      console.log(`review with ID ${reviewId} has been successfully removed from ${foundreview.username._id}'s reviews list.`);
      res.status(200).json({ message: `review with ID ${reviewId} has been successfully removed from the database.`});
    })
    .catch((err) => {
      console.log("Error deleting review", err);
      res.status(500).json({ message: "Error deleting review" });
    });
});
module.exports = router;
