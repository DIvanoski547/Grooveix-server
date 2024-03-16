const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Album = require("../models/Album.model");
const Review = require("../models/Review.model")

// POST route /albums/:albumId/review for adding a new review to a specific album by Id

router.post("/albums/:albumId/create-review", isAuthenticated, (req, res, next) => {
 const {albumId} = req.params;
 const { content, rating } = req.body;
//  const album = albumId;
//  const review = [content, rating];
 const user = req.payload._Id

 Review.create({username: user, album: albumId, content, rating})
 .then((newReview) => {
Album.findbyIdandUpdate(albumId, {$push: {reviews: newReview._Id}})
})
.then((response) => res.json(response))
.catch(err => {err})
})


module.exports = router;