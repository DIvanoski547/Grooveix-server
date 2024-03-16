const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Review = require("../models/Review.model")

// POST route /albums/:albumId/review for adding a new review to a specific album by Id

router.post("/albums/:albumId/review", (req, res, next) => {
    const {albumId} = req.params
    const { username, album, rating, content } = req.body;
    const { album } = { albumId };
    Review.create({username, album, rating, content})

})


module.exports = router;