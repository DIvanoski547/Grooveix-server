const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

//we are gonna handle file uploading routes for user's profile image in this file too

// import user model
const User = require("../models/User.model");
//import cloudinary configuration
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//POST route for sending file path
router.post("/image-upload", fileUploader.single("image"), (req, res) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  //get url of the file and send it as a response
  res.json({ image: req.file.path });
});

//GET route to retrieve authenticated user's information
router.get("/users", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

//PUT route to update user's information and add the new file as profile image
router.put("/users", (req, res) => {
  const { _id, image } = req.body;

  User.findByIdAndUpdate(_id, { profileImage: image }, { new: true }).then(
    (updatedUser) => {
      //deconstruct body
      const { _id, profileImage, firstName, lastName, username, email } =
        updatedUser;
      res
        .json({
          updatedUser: {
            _id,
            profileImage,
            firstName,
            lastName,
            username,
            email,
          },
        })
        .catch((err) => next(err));
    }
  );
});

module.exports = router;
