//import dependencies
const router = require("express").Router();
const mongoose = require("mongoose");
// import data models
const Album = require("../models/Album.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
//import middleware
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
//import cloudinary configuration
const fileUploader = require("../config/cloudinary.config");

//POST route for uploading album image
router.post("/image-upload", fileUploader.single("albumImage"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ albumImage: req.file.path})
})


//GET Route /albums -> show all albums
router.get("/", isAuthenticated, (req, res, next) => {
  Album.find()
    .then((allAlbums) => {
      res.status(200).json(allAlbums);
    })
    .catch((err) => {
      console.log("Error while getting all albums", err);
      res.status(500).json({ message: "Error while getting all albums" });
    });
});

//POST Route /albums -> add new album to the data base
router.post("/", isAuthenticated, isAdmin, (req, res, next) => {
  const { albumImage, albumName, artistsNames } = req.body;

  //check if any of the fields are empty
  if (albumImage === "" || albumName === "" || artistsNames === "") {
    res.status(400).json({message: "Please fill in the fiels"})
  }

  //check if album is already in database
  Album.findOne({ albumName, artistsNames }).then(foundAlbum => {
    
    if (foundAlbum) {
      res.status(400).json({ message: "Album already exists" });
      return;
    }
    return Album.create({ albumImage, albumName, artistsNames, reviews: [] })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error while creating album", err);
      res.status(500).json({ message: "error while creating album" });
    });
  })
  
});

//GET Route /albums/:albumId ->  show one specific album with its reviews
router.get("/:albumId", isAuthenticated, (req, res, next) => {
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
router.put("/:albumId", isAuthenticated, isAdmin, (req, res, next) => {
  const { albumId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findByIdAndUpdate(albumId, req.body, { new: true })
    .then((updatedAlbum) => res.json(updatedAlbum))
    .catch((err) => {
      console.log("Error while updating album", err);
      res.status(500).json({ message: "Error while updating album" });
    });
});

//DELETE Route /albums/:albumId -> delete one specific album
router.delete(
  "/:albumId",
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
