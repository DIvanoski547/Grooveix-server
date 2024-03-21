const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const Album = require("../models/Album.model");
const User = require("../models/User.model");

//GET Route /api/users -> ADMIN -> display all the users from database
router.get("/all-users", isAuthenticated, isAdmin, (req, res, next) => {
  User.find()
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch((err) => {
      console.log("error while getting all users", err);
      res.status(500).json({ message: "error while getting all users" });
    });
});

//POST Route /api/users -> JSON -> ADMIN -> send data to add a new user in the database
router.post("/all-users", isAuthenticated, isAdmin, (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  User.create({ firstName, lastName, username, email, password })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error while creating user", err);
      res.status(500).json({ message: "error while creating user" });
    });
});

//PUT Route /api/users/:userId -> JSON -> ADMIN -> update specific user’s information
router.put("/all-users/:userId", isAuthenticated, isAdmin, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => {
      console.log("error while updating user", err);
      res.status(500).json({ message: "error while updating user" });
    });
});

//GET Route /api/profile ---> none ---> display current user info
router.get("/profile", isAuthenticated, (req, res, next) => {
  console.log("payload", req.payload);

  User.findById(req.payload._id)
    .then((loggedUser) => res.status(200).json(loggedUser))
    .catch((err) => {
      console.log("error while retrieving user", err);
      res.status(500).json({ message: "error while retrieving user" });
    });
});

//GET Route /api/users/:userId ---> none ---> displays specific user info profile by id ---> you must be the admin user
router.get("/users/:userId", isAuthenticated, isAdmin, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .then((oneUser) => res.status(200).json(oneUser))
    .catch((err) => {
      console.log("error while retrieving user", err);
      res.status(500).json({ message: "error while retrieving user" });
    });
});

module.exports = router;
