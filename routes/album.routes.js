const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const Album = require("../models/Album.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");

//GET Route /api/albums -> show all albums
router.get("/albums", isAuthenticated, (req, res, next) => {
  Album.find()
    .then((allAlbums) => {
      res.json(allAlbums);
    })
    .catch((err) => {
      console.log("error while getting all albums", err);
      res.status(500).json({ message: "error while getting all albums" });
    });
});

//POST Route /api/albums -> add new album to the data base
router.post("/albums", isAuthenticated, isAdmin, (req, res, next) => {
  const { albumImage, albumName, artistsNames } = req.body;

  Album.create({ albumImage, albumName, artistsNames, reviews: [] })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error while creating album", err);
      res.status(500).json({ message: "error while creating album" });
    });
});

//GET Route /api/albums/:albumId ->  show one specific album with its reviews
router.get("/albums/:albumId", isAuthenticated, (req, res, next) => {
  const { albumId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findById(albumId)
    .populate("reviews")
    .then((oneAlbum) => res.status(200).json(oneAlbum))
    .catch((err) => {
      console.log("error while retrieving album", err);
      res.status(500).json({ message: "error while retrieving album" });
    });
});

//PUT Route/albums/:albumId -> update one specific album
router.put("/albums/:albumId", isAuthenticated, isAdmin, (req, res, next) => {
  const { albumId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findByIdAndUpdate(albumId, req.body, { new: true })
    .then((updatedAlbum) => res.json(updatedAlbum))
    .catch((err) => {
      console.log("error while updating album", err);
      res.status(500).json({ message: "error while updating album" });
    });
});

//DELETE Route /albums/:albumId -> delete one specific album
router.delete(
  "/albums/:albumId",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
    const { albumId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(albumId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Album.findByIdAndDelete(albumId)
      .then(() =>
        res.json({
          message: `Album with ${albumId} is removed successfully.`,
        })
      )
      .catch((err) => {
        console.log("error while deleting album", err);
        res.status(500).json({ message: "error while deleting album" });
      });
  }
);

module.exports = router;
