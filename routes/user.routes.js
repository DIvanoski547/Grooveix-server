const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const album = require("../models/Album.model");
const user = require("../models/User.model");

//GET Route /api/users -> none -> display all the users from database

//POST Route /api/users -> JSON -> send data to add a new user in the database

//PUT Route /api/:userId -> JSON -> update specific user’s information

//GET Route /api/profile ---> none ---> display current user info

//GET Route /api/users/:userId ---> none ---> displays specific user info profile by id


module.exports = router;
